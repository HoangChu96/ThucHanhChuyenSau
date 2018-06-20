<?php
namespace App\Model\Table;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;
use Illuminate\Support\Facades\Log;
use App\Model\User;
use DB;
use Validator;
use Schema;

abstract class CoreTable
{
	/**
     * 3 modes to decide how the retrieve function will display soft_deleted model or not
     * @var string 3 modes:
     * 'normal' will only return object with havent been soft deleted
     * 'trash' only display soft deleted object
     * 'all' display both
     */
    protected $soft_delete_mode = 'normal';

    /**
     * @var null Default order by value
     */
    protected $order_by = null;

    /**
     * @var null Default order direction value
     */
    protected $order_dir = 'asc';

    /**
     * @var int Default Limit value
     */
    protected $limit = 50;

    /**
     * The return mode of function items or similar which will decide the format of the return function
     * @var string The format of the return function will base on the following value:
     *  'paging': This is for paging request. return format: {
     *   total: [int] Total number of item
     *   items: [array] List of items (the number might not match the total since it can be only one page)
     *  }
     *
     * 'array': Return all item in single array. This will always return all items at once. Return format:
     * [item1, item2, ...]
     */
    protected $list_item_return_format = 'paging';

    /**
     * @var array List of table will be join with current table when query.
     * Format: [[target_table_name, target_table_name.pk_field, condition(=,!=,...), 'current_table_name.fk_field']]
     */
    protected $join = [];

    /**
     * When we want to sort using custom key, we will use this map to point that custom key to the actual key
     * @var array Map for the sorting. Format ['custom_sort_key' => 'target_key']
     */
    protected $sort_map = [];

    /**
     * When we want to filter using custom key, we will use this map to point that custom key to the actual key
     * @var array Map for the sorting. Format ['custom_map_key' => 'target_key']
     */
    protected $filter_map = [];

    /**
     * Any field in this list will be handle by custom filter instead of default
     * @var array
     */
    protected $custom_filter = [];

    /**
     * Property in this array will be perform deep search when filter with LIKE.
     * @var array
     */
    protected $deep_like_field = [];

    /**
     * Property in this array will be perform LIKE search with given value
     * @var array
     */
    protected $all_search_fields = [];

    /**
     * The requester who will perform the function in this object. The class will using this variable
     * to check for permission on each function call. 
     * If this variable is set to null then no permission check will be called. It will then let the called function
     * to decided if the missing of user will be reject or not?
     * 
     * @var User
     */
    protected $requester = null;

	/**
     * This model will be mostly use for fetching and query
     * @param $origin    If set to true, will return the class model. If false, will return model which usually using for fetching (and can include extra data)
     * @return CActiveRecord which model is working
     */
    public abstract function getModel($origin = false);

    /**
     * Get table name.
     * Normally the system will using the getModel function then get the name. In case this function does not work,
     * we will switch to this
     */
    public function getTableName()
    {
        return null;
    }

    /**
     * Get the rule when creating the object
     * @return [array|null] [Validation format of laravel]
     */
    public function getCreateRules()
    {
        return null;
    }

    /**
     * Get the rule when update the object
     * @return [array|null] [Validation format of laravel]
     */
    public function getUpdateRules()
    {
        return null;
    }

    /**
     * Get the validation message which will be used to return error message when validation happen
     */
    public function getValidationMessages()
    {
        return null;
    }

    /**
     * Set function for Requesters
     */
    public function setRequester($requester)
    {
        $this->requester = $requester;
    }

    public function allowViewSoftDeleted()
    {
        $this->soft_delete_mode = 'all';
    }
    public function allowViewSoftDeletedOnly()
    {
        $this->soft_delete_mode = 'trash';
    }
    public function disableViewSoftDeleted()
    {
        $this->soft_delete_mode = 'normal';
    }

    public function setLimit($limit)
    {
        $this->limit = $limit;
    }

    /**
     * Change the list format mode
     * @param [string] $mode [array or paging]
     */
    public function setListFormatMode($mode)
    {
        $this->list_item_return_format = $mode;
    }

    /**
     * Function to get the error object which will be used in data quering or CRUD
     * @return [stdClass] [Error object]
     */
    public function generateErrorObject()
    {   
        $report = new \stdClass();
        $report->success = false;
        $report->message = null;
        $report->data = null;
        $report->code = 500;
        $report->errors = null;
        return $report;  
    }

    /**
     * Assign custom filter to current model for selected field
     * @param $model    Eloquent model
     * @param $field    Filter field
     * @param $condition    Filter condtion (can be text, object,...)
     * @return null|Eloquent model
     */
    protected function parseCustomFilter($model, $field, $condition){
        return null;
    }

    /**
     * This function will read the data which is expected to be passed to items function
     * and only get the one that is match the allowed format
     * @param  [array] $data [Fetch configuration]
     * @return [array]       [The array data after remove unneccessary data]
     */
    public function fetchFilter($data)
    {
        if(!$data || !isset($data['filter'])) {
            $query = array();
        } else {
            $query = json_decode($data['filter'], true);
        }

        return $query;
    }

	/**
	 * Function to get user from id, return null if not found
	 * @param  [type] $id [description]
	 * @return [type]     [description]
	 */
    public function find($id)
    {
    	try{
            if(!$id){
                return null;
            }

            $model = $this->getModel();
            if($this->soft_delete_mode == 'trash') {
                $model = $model->onlyTrashed();
            } elseif($this->soft_delete_mode == 'all') {
                $model = $model->withTrashed();
            }

            $result = $model->find($id);

            if(!$result && $throwException){
                throw new ModelNotFoundException();
                return null;
            }

            return $result;
        }
        catch(Exception $e){
            throw new Exception($e->getMessage());
            return null;
        }
    }

    /**
     * Get the list of item for current model, base on the query
     * @param $params array contain config to get data. The format will be as following:
     * {
     *  filter {
     *   where: {
     *    field: {              //field will take the name of the atribute which will be used to compare. For example column "name" of table User
     *     like: 'value',
     *     lessOrEqual: number_value,
     *     moreOrEqual: number_value,
     *     more: number_value,
     *     less: number_value,
     *     equal: 'value',
     *     notEqual: 'value'
     *    }
     *   },
     *   orders: [
     *       "field1 asc",
     *       "field2 desc"
     *   ],
     *   limit: number_value,
     *   offset: number_value
     *  }
     * }
     * @param $extraCondition array contain extra condition for the query
     * @return null
     * @throws Exception
     */
    public function items($params, $extraCondition = null) 
    {
        try{
            $query = $this->fetchFilter($params);

            $total = 0;

            $model = $this->getModel();
            if($this->soft_delete_mode == 'trash') {
                $model = $model->onlyTrashed();
            } elseif($this->soft_delete_mode == 'all') {
                $model = $model->withTrashed();
            }

            if(method_exists($model, 'getTable')) {
                $tableName = $model->getTable();
            }
            else {
                $tableName = $this->getTableName();
            }
            
            //with
            if($this->join && count($this->join) > 0) {
                foreach($this->join as $join) {
                    if(count($join) == 4)
                        $model = $model->select($tableName.'.*')->leftJoin($join[0], $join[1], $join[2], $join[3]);
                }
            } else {
                $model = $model->select($tableName.'.*');
            }

            //conditions
            if(isset($query['where'])) {
                $model = $this->parseCondition($model, $query['where'], $tableName);
            }

            //extra condition
            if($extraCondition) {
                $model = $this->parseCondition($model, $extraCondition, $tableName);
            }

            //get total here
            $total = $model->count();

            //order
            if(isset($query['orders']) && is_array($query['orders'])) {
                for($i = 0; $i < count($query['orders']); $i++) {
                    $iOrder = $query['orders'][$i];

                    $parts = explode(' ', $iOrder);
                    if(count($parts) > 1) {
                        $dir = (strtolower($parts[1]) === 'desc')?'desc':'asc';
                        $field = $parts[0];
                    } elseif(count($parts) == 1) {
                        $dir = 'asc';
                        $field = $parts[0];
                    }

                    //check the sort map
                    if(isset($this->sort_map[$field])) {
                        $field = $this->sort_map[$field];
                    }

                    $model = $model->orderBy($field, $dir);
                }
            } else {
                if($this->order_by) {
                    $model = $model->orderBy($this->order_by, $this->order_dir);
                }
            }

            //limit
            $noLimit = false;
            if(isset($query['limit'])) {
                if($query['limit'] < 0) {
                    //no limit
                    $noLimit = true;
                } else {
                    $model = $model->limit($query['limit']);
                }
            } else {
                if($this->limit > 0) {
                    $model = $model->limit($this->limit);
                } else {
                    $noLimit = true;
                }
            }

            //offset
            if(isset($query['offset']) && $noLimit == false) {
                $offset = intval($query['offset']);
                $model = $model->offset($offset);
            }

            $items = $model->get();

            if($this->list_item_return_format == 'array') {
                $result = $items;
            } else {
                $result = [
                    'total' => $total,
                    'items' => $items,
                ];
            }

            return $result;
        }
        catch(Exception $e) {
            Log::error("Cannot fetch object due to following error:", ['error' => $e->getMessage()]);
            throw new Exception($e->getMessage());
            return null;
        }
    }

    /**
     * Parse the condition for the given query
     * @param $model    The model object
     * @param $conditions   Condition dict
     * @param $tableName    Name of the working table
     * @return Eloquent|null
     */
    public function parseCondition($model, $conditions, $tableName)
    {
        if(isset($conditions)) {
            foreach($conditions as $field => $condition) {
                if($field && $condition) {

                    //check the custom filter first
                    if(in_array($field, $this->custom_filter)) {
                        $customModel = $this->parseCustomFilter($model, $field, $condition);
                        if($customModel) {
                            $model = $customModel;
                        }
                    } elseif($field == 'all') {
                        //this is the case when user want to search for everything that match the given value. We will have to check all fields that
                        //is set to be used in "all" case
                        $value = $condition;
                        if($condition && count($this->all_search_fields) > 0) {
                            $allFields = $this->all_search_fields;
                            $model->where(function($query) use ($allFields, $value, $tableName){
                                for($i = 0; $i < count($allFields); $i++) {
                                    if(in_array($allFields[$i], $this->custom_filter)) {
                                        $iField = $allFields[$i];
                                        $query->orWhere(function($queryCustomDeep) use ($iField, $value){
                                            $customModel = $this->parseCustomFilter($queryCustomDeep, $iField, ['like' => $value]);
                                            if($customModel) {
                                                $queryCustomDeep = $customModel;
                                            }
                                        });
                                    } else {
                                        $isDeepSearch = false;

                                        if(in_array($allFields[$i], $this->deep_like_field)) {
                                            $isDeepSearch = true;
                                        }

                                        if(strpos($allFields[$i], ".") === false) {
                                            $iField = $tableName . '.' . $allFields[$i];
                                        } else {
                                            $iField = $allFields[$i];
                                        }

                                        if($isDeepSearch) {
                                            $parts = explode(' ', $value);
                                            $query->orWhere(function($queryDeep) use ($iField, $parts) {
                                                foreach($parts as $part) {
                                                    $queryDeep->where($iField, 'like','%'.$part.'%');
                                                }
                                            });
                                        } else {
                                            $query->orWhere($iField, 'like','%'.$value.'%');
                                        }
                                    }
                                }
                            });
                        }
                    } else {
                        //check the map
                        if(isset($this->filter_map[$field])) {
                            $field = $this->filter_map[$field];
                        }

                        //if field dont have ., we will connect current table name into it
                        if(strpos($field, ".") === false) {
                            $field = $tableName . '.' . $field;
                        }

                        if(isset($condition['like'])) {
                            $value = $condition['like'];

                            if(in_array($field, $this->deep_like_field)) {
                                $parts = explode(' ', $value);
                                foreach($parts as $part) {
                                    $model->where($field, 'like','%'.$part.'%');
                                }
                            } else {
                                $model->where($field, 'like','%'.$value.'%');
                            }
                        }

                        if(isset($condition['lessOrEqual'])) {
                            $value = $condition['lessOrEqual'];
                            $model->where($field, '<=',$value);
                        }

                        if(isset($condition['moreOrEqual'])) {
                            $value = $condition['moreOrEqual'];
                            $model->where($field, '>=',$value);
                        }

                        if(isset($condition['more'])) {
                            $value = $condition['more'];
                            $model->where($field, '>',$value);
                        }

                        if(isset($condition['less'])) {
                            $value = $condition['less'];
                            $model->where($field, '<',$value);
                        }

                        if(isset($condition['equal'])) {
                            $value = $condition['equal'];
                            $model->where($field, $value);
                        }

                        if(isset($condition['notEqual'])) {
                            $value = $condition['notEqual'];
                            $model->where($field, '<>',$value);
                        }

                        if(isset($condition['null'])) {
                            $model->whereNull($field);
                        }

                        if(isset($condition['notNull'])) {
                            $model->whereNotNull($field);
                        }

                        if(isset($condition['in'])) {
                            $value = $condition['in'];
                            $parseValue = null;
                            if(is_array($value)) {
                                $parseValue = $value;
                            } else {
                                $parseValue = json_decode($value);
                            }
                            $model->whereIn($field, $parseValue);
                        }
                    }
                }
            }
        }

        return $model;
    }

    /**
     * This function will help remove the selected items.
     * Note: this function only work if the model have the function remove() and lock() inherited
     * @param  [array]  $items            [List of items will be removed]
     * @param  boolean $permanent        [true if the item will be removed completly]
     * @param  boolean $recoveryIfFailed [if set to true, a single faise will cause the whole process to be revert to previous state. If false, we will report which one success, which one failed]
     * @param string $reason [reason why this item got lock]
     * @return [dict | null]                    [{
     *  totalSuccess: number
     *  totalFailure: number
     *  status: 'applied' or 'reverted',  //applied if the success ones have been applied. Revert if the data have been revert to before the function call (no thing updated)
     *  report: {
     *   scrubId: null or string.[null if delete success, string if failed],
     *   scrubId: null or string.[null if delete success, string if failed]
     *  }
     * }]
     * If the result result is null, it mean the input data is invalid
     */
    public function delete($items, $permanent = false, $recoveryIfFailed = false, $reason = null){
        try{
            if(!$items || count($items) == 0){
                return null;
            }

            DB::beginTransaction();

            $haveFailure = false;
            $reports = [
                'totalSuccess' => 0,
                'totalFailure' => 0,
                'status' => ($recoveryIfFailed ? 'reverted' : 'applied'),
                'report' => []
            ];

            foreach ($items as $item) {
                $result = null;

                if($permanent) {
                    if(method_exists($item, 'remove')) {
                        try{
                            $result = $item->remove();
                        }
                        catch(Exception $ex) {
                            Log::error("Cannot remove item due to error:", ['item' => $ex->getMessage()]);
                            $result = __("Cannot remove selected item due to internal error.");
                        }
                        
                    } else {
                        Log::error("Cannot remove item since this item dont have remove function override", ['item' => $item]);
                        $result = __("Cannot remove selected item due to internal error.");
                    }
                } else {
                    if(method_exists($item, 'lock')) {
                        $result = $item->lock($reason);
                    } else {
                        Log::error("Cannot lock item since this item dont have lock function override", ['item' => $item]);
                        $result = __("Cannot lock selected item due to internal error.");
                    }
                }

                $reports['report'][$item->getPublicIdentity()] = $result;
                if($result) {
                    $haveFailure = true;
                    $reports['totalFailure']++;
                } else {
                    $reports['totalSuccess']++;
                }
            }

            if($haveFailure && $recoveryIfFailed) {
                DB::rollBack();
            } else {
                DB::commit();
            }

            return $reports;
        }
        catch(Exception $e){
            Log::error("Cannot delete object due to error:", ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Function to recovery deleted items from deleted state
     * @param  [array]  $items            [List of items will be unlocked]
     * @param  boolean $recoveryIfFailed [if set to true, a single faise will cause the whole process to be revert to previous state. If false, we will report which one success, which one failed]
     * @param  string $reason [reason why this item got unlock]
     * @return [dict | null]                    [{
     *  totalSuccess: number
     *  totalFailure: number
     *  status: 'applied' or 'reverted',  //applied if the success ones have been applied. Revert if the data have been revert to before the function call (no thing updated)
     *  report: {
     *   scrubId: null or string.[null if delete success, string if failed],
     *   scrubId: null or string.[null if delete success, string if failed]
     *  }
     * }]
     * If the result result is null, it mean the input data is invalid
     */
    public function recovery($items, $recoveryIfFailed = false, $reason = null)
    {
        try{
            if(!$items || count($items) == 0){
                return null;
            }

            DB::beginTransaction();

            $haveFailure = false;
            $reports = [
                'totalSuccess' => 0,
                'totalFailure' => 0,
                'status' => ($recoveryIfFailed ? 'reverted' : 'applied'),
                'report' => []
            ];

            foreach ($items as $item) {
                $result = null;

                if(method_exists($item, 'unlock')) {
                    $result = $item->unlock($reason);
                } else {
                    Log::error("Cannot unlock item since this item dont have unlock function override", ['item' => $item]);
                    $result = __("Cannot unlock selected item due to internal error.");
                }

                $reports['report'][$item->getPublicIdentity()] = $result;
                if($result) {
                    $haveFailure = true;
                    $reports['totalFailure']++;
                } else {
                    $reports['totalSuccess']++;
                }
            }

            if($haveFailure && $recoveryIfFailed) {
                DB::rollBack();
            } else {
                DB::commit();
            }

            return $reports;
        }
        catch(Exception $e){
            Log::error("Cannot unlock object due to error:", ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Create new item with given data
     * @param $data Array set (in array format)
     * @return [object] [object content the result:
     *  success: [boolean] [true if creating success]
     *  code: [int] [200 if success. other if there is error]
     *  message: [string] [error message]
     *  data: [object | null] The created object if success
     *  errors: [array] List of invalidate message if failed to created. If status code is 400, this is a dict error. Other case it will only be a message
     * ]
     */
    public function create($data){
        $result = $this->generateErrorObject();

        try{
            if(!$data) {
                $result->errors = null;
                $result->data = 400;
                $result->message = __("Create request cannot be processed due to contain invalid data");
                return $result;
            }

            $createRules = $this->getCreateRules();
            if($createRules) {
                //validate
                $messages = $this->getValidationMessages();
                $validator = Validator::make($data, $createRules, $messages);

                if ($validator->fails()) {
                    $result->errors = $validator->errors();
                    $result->code = 400;
                    $result->message = __("Create request cannot be processed due to contain invalid data");
                    return $result;
                }
            }

            $item = $this->getModel(true);

            foreach($data as $propertyName => $value){
                // we will only update property that this object have, and ignore the rest. Also we will ignore primary key too
                // And we will only accept primary data only
                if($propertyName !== 'id' && $propertyName !== 'scrub_id'){
                    try{
                        if(Schema::hasColumn($item->getTable(), $propertyName)){
                            $item->$propertyName = $value;
                        }
                    }
                    catch(Exception $e){
                        //ignore and carry on
                    }
                }
            }

            $createResult = $item->save();

            $result->success = $createResult;
            $result->data = $item;
            $result->code = ($createResult ? 200 : 500);

            return $result;
        }
        catch(Exception $e){
            $result->success = false;
            $result->errors = $e->getMessage();
            $result->data = 500;
            $result->message = __("Create request cannot be processed due to unexpected data");
            return $result;
        }
    }

    /**
     * Update selected item with given data
     * @param $item Object The item will be updated
     * @param $data Array set (in array format)
     * @return [object] [object content the result:
     *  success: [boolean] [true if update success]
     *  code: [int] [200 if success. other if there is error]
     *  message: [string] [error message]
     *  data: [object | null] The updated object if success
     *  errors: [array] List of invalidate message if failed to update. If status code is 400, this is a dict error. Other case it will only be a message
     * ]
     */
    public function update($item, $data){
        $result = $this->generateErrorObject();

        try{
            if(!$item || !$data){
                $result->errors = null;
                $result->data = 400;
                $result->message = __("Update request cannot be processed due to contain invalid data");
                return $result;
            }

            $updateRules = $this->getUpdateRules();
            if($updateRules) {
                //validate
                $messages = $this->getValidationMessages();
                $validator = Validator::make($data, $updateRules, $messages);

                if ($validator->fails()) {
                    $result->errors = $validator->errors();
                    $result->code = 400;
                    $result->message = __("Update request cannot be processed due to contain invalid data");
                    return $result;
                }
            }

            foreach($data as $propertyName => $value){
                // we will only update property that this object have, and ignore the rest. Also we will ignore primary key too
                // And we will only accept primary data only
                if($propertyName !== 'id'){
                    try{
                        if(Schema::hasColumn($item->getTable(), $propertyName)){
                            $item->$propertyName = $value;
                        }
                    }
                    catch(Exception $e){
                        //ignore and carry on
                    }
                }
            }

            $updateResult = $item->save();

            if($item->id) {
                $item = $this->find($item->id);
            }

            $result->success = $updateResult;
            $result->data = $item;
            $result->code = ($updateResult ? 200 : 500);

            return $result;
        }
        catch(Exception $e){
            $result->success = false;
            $result->errors = $e->getMessage();
            $result->data = 500;
            $result->message = __("Update request cannot be processed due to unexpected data");
            return $result;
        }
    }
}