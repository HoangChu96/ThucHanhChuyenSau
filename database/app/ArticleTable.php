<?php
namespace App\Model\Table;

use DB;
use Validator;
use Illuminate\Support\Facades\Log;

use App\Model\Activity\BackendArticleActivity;
use App\Model\Permission\Backend\Article\ArticlePermission;
use App\Model\Workflow\Article\ArticleWorkflow;

use App\Model\User;
use App\Model\Article;
use App\Model\Category;

use App\Model\Table\UserTable;

class ArticleTable extends CoreTable
{
    protected $all_search_fields = ['title', 'content', 'category_name', 'author_data', 'reviewer_data'];
    protected $deep_like_field = ['title', 'content'];
    protected $custom_filter = ['category_name', 'author_data', 'reviewer_data', 'categories', 'authors', 'reviewers', 'author_or_reviewer', 'languages'];

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->order_by = Article::$default_order_by;
        $this->order_dir = 'desc';
    }

    /**
     * Return the core model of this class. If role is set we will return model which already sorted with role.
     * Note: when role is set, the coreTable will need to get the table name using function getTableName(). Make sure to set that
     * By default the role "AFO" is required
     * 
     * @return [type] [description]
     */
    public function getModel($origin = false)
    {
        return (new Article); 
    }

    /**
     * This class need this since the getModel might using role base model
     * @return [type] [description]
     */
    public function getTableName()
    {
        return (new Article)->getTable();
    }

    /**
     * Assign custom filter to current model for selected field
     * @param $model    Eloquent model
     * @param $field    Filter field
     * @param $condition    Filter condtion (can be text, object,...)
     * @return null|Eloquent model
     */
    protected function parseCustomFilter($model, $field, $condition){
        if(strtolower($field) === 'category_name' && $condition && isset($condition['like'])){
            $value = $condition['like'];
            
            $model = $model->whereHas('category', function ($query) use ($value) {
                $query->where('name', 'like', '%'.$value.'%');
            });

            return $model;
        } else if(strtolower($field) === 'author_data' && $condition && isset($condition['like'])){
            $value = $condition['like'];

            $model = $model->whereHas('author', function ($query) use ($value) {
                $query->where(function($authorQuery) use ($value){
                    $authorQuery->orWhere('first_name', 'like', '%'.$value.'%');
                    $authorQuery->orWhere('last_name', 'like', '%'.$value.'%');
                    $authorQuery->orWhere('email', 'like', '%'.$value.'%');
                });
            });

            return $model;
        } else if(strtolower($field) === 'reviewer_data' && $condition && isset($condition['like'])){
            $value = $condition['like'];

            $model = $model->whereHas('reviewer', function ($query) use ($value) {
                $query->where(function($reviewerQuery) use ($value){
                    $reviewerQuery->orWhere('first_name', 'like', '%'.$value.'%');
                    $reviewerQuery->orWhere('last_name', 'like', '%'.$value.'%');
                    $reviewerQuery->orWhere('email', 'like', '%'.$value.'%');
                });
            });

            return $model;
        } else if(strtolower($field) === 'categories' && $condition && isset($condition['in'])){
            $value = $condition['in'];
            if(is_array($value)) {
                $categories = $value;
            } else {
                $categories = json_decode($value);
            }

            $model = $model->whereHas('category', function ($query) use ($categories) {
                $query->whereIn('scrub_id', $categories);
            });

            return $model;
        } else if(strtolower($field) === 'authors' && $condition && isset($condition['in'])){
            $value = $condition['in'];
            if(is_array($value)) {
                $authors = $value;
            } else {
                $authors = json_decode($value);
            }

            $model = $model->whereHas('author', function ($query) use ($authors) {
                $query->whereIn('scrub_id', $authors);
            });

            return $model;
        } else if(strtolower($field) === 'reviewers' && $condition && isset($condition['in'])){
            $value = $condition['in'];
            if(is_array($value)) {
                $reviewers = $value;
            } else {
                $reviewers = json_decode($value);
            }

            $model = $model->whereHas('reviewer', function ($query) use ($reviewers) {
                $query->whereIn('scrub_id', $reviewers);
            });

            return $model;
        } else if(strtolower($field) === 'author_or_reviewer' && $condition && isset($condition['equal'])){
            $staffId = $condition['equal'];

            $model->where(function($query) use ($staffId){
                $query->orWhere('author_id', $staffId);
                $query->orWhere('reviewer_id', $staffId);
            });

            return $model;
        } else if(strtolower($field) === 'languages' && $condition && isset($condition['in'])){
            $value = $condition['in'];
            if(is_array($value)) {
                $languages = $value;
            } else {
                $languages = json_decode($value);
            }

            $model = $model->whereHas('language', function ($query) use ($languages) {
                $query->whereIn('language', $languages);
            });

            return $model;
        }

        return null;
    }

    /**
     * Rule to create new category
     * @return [array] [validation setting follow laravel validation]
     */
    public function getCreateRules()
    {
        return [
            'title' => ['required'],
            'language_id' => ['required'],
            'category_id' => ['required'],
            'author_id' => ['required'],
        ];
    }

    /**
     * Rule to update category
     * @return [array] [validation setting follow laravel validation]
     */
    public function getUpdateRules()
    {
        return [
            'title' => ['required'],
            'language_id' => ['required'],
            'category_id' => ['required'],
            'author_id' => ['required'],
        ];
    }

    /**
     * Get the validation message which will be used to return error message when validation happen
     */
    public function getValidationMessages()
    {
        return [
            'title.required' => __("Article title is required."),
            'category_id.required' => __("Article category is required."),
            'author_id.required' => __("Article author is required."),
            'language_id.required' => __("Article language is required.")
        ];
    }

    /**
     * Function extends from items function of CoreTable which will return the list of article
     * Note: Staff need access permission to call this function
     * Note: Only staff with view all permission can view all article, otherwise they can only view their own article or the article that they are set as reviewer
     * 
     * @param  [dict] $params [Check $params on CoreTable items function]
     * @return [array|dict]         [List of article which match given query. The format will base on setting of this class]
     */
    public function articles($params)
    {
        //only user with permission to access admin panel and article section can do this action
        ArticlePermission::haveAdminArticleAccess();

        //if this user have permission to view deleted, let them view it.
        if(ArticlePermission::canViewDeleted()) {
            $this->allowViewSoftDeleted();
        }

        //if this user dont have permission to view all, they can only view article that they are author or reviewer
        if(ArticlePermission::canViewAll()) {
            $conditions = null;
        } else {
            $conditions = [
                "author_or_reviewer" => [
                    "equal" => UserTable::currentUser()->id
                ]
            ];
        }
        
        return $this->items($params, $conditions);
    }

    /**
     * Lock the selected article
     * @param  [array] $scrubIds [List of article scrubIds will be locked]
     * @param  [string] $reason [Reason why there items got locked]
     * @return [dict]           [Check the delete function of CoreTable]
     */
    public function lockArticles($scrubIds, $reason = null)
    {
        if(!$scrubIds || !is_array($scrubIds) || count($scrubIds) == 0) {
            return null;
        }

        //if this user have permission to view deleted, let them view it.
        $articleModel = (new Article);
        if(ArticlePermission::canViewDeleted()) {
            $articleModel = $articleModel->withTrashed();
        }

        $articles = $articleModel->whereIn('scrub_id', $scrubIds)->get();
        if(count($articles) == 0) {
            return null;
        }

        //check if there is any article user dont have permission to perform this action
        //this action will be stopped even if one one article dont have enough permission to be locked
        foreach($articles as $article) {
            ArticlePermission::checkSoftDeleteArticle(null, $article);
        }

        $result = $this->delete($articles, false, false, $reason);

        if($result && isset($result['report'])) {
            $successArticleIds = [];
            foreach($result['report'] as $scrub => $failedReason) {
                if(!$failedReason) {
                    array_push($successArticleIds, $scrub);
                }
            }
            $successArticles = $articleModel->whereIn('scrub_id', $successArticleIds)->get();
            BackendArticleActivity::logArticleSoftDeleteAction($this->requester, $successArticles, $reason);
        }

        return $result;
    }

    /**
     * Unlock the selected articles
     * @param  [array] $scrubIds [List of article scrubIds will be unlocked]
     * @param  [string] $reason [Reason why there items got unlocked]
     * @return [dict]           [Check the lock function of CoreTable]
     */
    public function unlockArticles($scrubIds, $reason = null)
    {
        if(!$scrubIds || !is_array($scrubIds) || count($scrubIds) == 0) {
            return null;
        }

        //if this user have permission to view deleted, let them view it.
        $articleModel = (new Article);
        if(ArticlePermission::canViewDeleted()) {
            $articleModel = $articleModel->withTrashed();
        }

        $articles = $articleModel->whereIn('scrub_id', $scrubIds)->get();
        if(count($articles) == 0) {
            return null;
        }

        //check if there is any article user dont have permission to perform this action
        //this action will be stopped even if one one article dont have enough permission to be locked
        foreach($articles as $article) {
            ArticlePermission::checkRecoveryArticle(null, $article);
        }

        $result = $this->recovery($articles, false, $reason);

        if($result && isset($result['report'])) {
            $successArticleIds = [];
            foreach($result['report'] as $scrub => $failedReason) {
                if(!$failedReason) {
                    array_push($successArticleIds, $scrub);
                }
            }
            $successArticles = $articleModel->whereIn('scrub_id', $successArticleIds)->get();
            BackendArticleActivity::logArticleRecoveryAction($this->requester, $successArticles, $reason);
        }

        return $result;
    }

    /**
     * Remove the selected articles completly
     * @param  [array] $scrubIds [List of article scrubIds will be deleted]
     * @param  [string] $reason [Reason why there items got removed]
     * @return [dict]           [Check the delete function of CoreTable]
     */
    public function deleteArticles($scrubIds, $reason = null)
    {
        if(!$scrubIds || !is_array($scrubIds) || count($scrubIds) == 0) {
            return null;
        }

        //if this user have permission to view deleted, let them view it.
        $articleModel = (new Article);
        if(ArticlePermission::canViewDeleted()) {
            $articleModel = $articleModel->withTrashed();
        }

        $articles = $articleModel->whereIn('scrub_id', $scrubIds)->get();
        if(count($articles) == 0) {
            return null;
        }

        //check if there is any article user dont have permission to perform this action
        //this action will be stopped even if one one article dont have enough permission to be locked
        foreach($articles as $article) {
            ArticlePermission::checkRemoveArticle(null, $article);
        }

        $result = $this->delete($articles, true, false, $reason);

        if($result && isset($result['report'])) {
            $successArticles = [];
            foreach($articles as $article) {
                if(isset($result['report'][$article->scrub_id]) || is_null($result['report'][$article->scrub_id])) {
                    array_push($successArticles, $article);
                }
            }

            BackendArticleActivity::logArticleRemoveAction($this->requester, $successArticles, $reason);
        }

        return $result;
    }

    /**
     * Function to create article
     * This function will require creating article permission to work.
     * @param  [array] $data [Data will be used to create the category]
     * @return [object]       [Check create function in CoreTable.php]
     */
    public function createArticle($data)
    {
        //first we will need to check if this user will have permission or not
        ArticlePermission::checkCreateArticle();

        try{
            DB::beginTransaction();

            //make sure some data in creating follow the workflow
            //new article status already drafting
            $data['status'] = 'drafting';

            $createResult = $this->create($data);

            if(!$createResult->success) {
                Log::error("Cannot created article due to following error:", ['report' => $createResult]);
                return $createResult;
            }

            $article = $createResult->data;

            try {
                if($createResult->success) {
                    DB::commit();
                    BackendArticleActivity::logArticleCreatingAction($this->requester, $article);
                }
                else {
                    DB::rollBack();
                }

                return $createResult;
            }
            catch(Exception $e){
                DB::rollBack();
                Log::error("Cannot created article due to unexpected error from server:", ['error' => $e->getMessage()]);
                $createResult->message = __("Create request cannot be processed due to unexpected data");
                $createResult->code = 500;
                $createResult->errors = $e->getMessage();
                return $createResult;
            }
        }
        catch(Exception $e){
            DB::rollBack();
            Log::error("Cannot created article due to error:", ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Function to update the article.
     * This function require update permission, unless the current user is author or reviewer
     * Aside from update log, there is also log for following case:
     *  - Category update: when user change the category of the article
     * NOTE: this function wont update status. The status field will be tripped by default
     * @param  [string] $scrubId [Scrub Id of the article]
     * @param  [array] $data [Data will be used to update the article]
     * @return [object]       [Check update function in CoreTable.php]
     */
    public function updateArticle($scrubId, $data)
    {        
        try{
            //first we need to get the article
            $article = null;
            if($scrubId) {
                if(ArticlePermission::canViewDeleted()) {
                    $article = Article::withTrashed()->where('scrub_id', $scrubId)->first();
                } else {
                    $article = Article::where('scrub_id', $scrubId)->first();
                }
            }
            if(!$article) {
                $updateResult = $this->generateErrorObject();
                $updateResult->message = __("Cannot update selected article due to invalid provided data.");
                $updateResult->code = 400;
                return $updateResult; 
            }

            //now we need to check for permission to update this staff
            ArticlePermission::checkUpdateArticle(null, $article);

            if(isset($data['status'])) {
                unset($data['status']);
            }

            //check if there is any change in category
            $newCategory = null;
            $oldCategory = null;
            if(isset($data['category_id']) && $data['category_id'] != $article->category->id) {
                $oldCategory = $article->category;
                $newCategory = Category::find($data['category_id']);
            }

            //store this old data
            $oldData = $article->toArray();

            DB::beginTransaction();

            $updateResult = $this->update($article, $data);

            if(!$updateResult->success) {
                Log::error("Cannot update article due to following error:", ['report' => $updateResult]);
                return $updateResult;
            }

            $article = $updateResult->data;

            try {
                BackendArticleActivity::logArticleUpdatingAction($this->requester, $article, $oldData);

                if($newCategory) {
                    BackendArticleActivity::logArticleUpdatingCategoryAction($this->requester, $article, $oldCategory, $newCategory);
                }

                DB::commit();

                return $updateResult;
            }
            catch(Exception $e){
                DB::rollBack();
                Log::error("Cannot update article due to unexpected error from server:", ['error' => $e->getMessage()]);
                $updateResult->message = __("Update request cannot be processed due to unexpected data");
                $updateResult->code = 500;
                $updateResult->errors = $e->getMessage();
                return $updateResult;
            }
        }
        catch(Exception $e){
            DB::rollBack();
            Log::error("Cannot update article due to error:", ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Function to update a article status. This action will required the status to following the workflow in the system.
     * Note: This action require edit permission
     * Note: This action will have separate log from usually update
     * @param  [string] $scrubId   [selected article]
     * @param  [string] $newStatus [new status]
     * @param  [array] $data [Data given with the update]
     * @return [type]            [description]
     */
    public function updateStatus($scrubId, $newStatus, $data = null)
    {
        try{
            $article = null;
            if($scrubId) {
                if(ArticlePermission::canViewDeleted()) {
                    $article = Article::withTrashed()->where('scrub_id', $scrubId)->first();
                } else {
                    $article = Article::where('scrub_id', $scrubId)->first();
                }
            }
            if(!$article) {
                $updateResult = $this->generateErrorObject();
                $updateResult->message = __("Cannot update selected article due to invalid provided data.");
                $updateResult->code = 400;
                return $updateResult; 
            }

            //now we need to check for permission to update this staff
            ArticlePermission::checkUpdateArticle(null, $article);

            $updateResult = ArticleWorkflow::changeArticleStatus($this->requester, $article, $newStatus, $data);

            if(!$updateResult->success) {
                return $updateResult; 
            }

            return $updateResult;
        }
        catch(Exception $e){
            Log::error("Cannot update article due to error:", ['error' => $e->getMessage()]);
            return null;
        }
    }
}