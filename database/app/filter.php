<?php
//collection
	include('connect/connect.php');

	$collection = $mysqli->query(
									"SELECT p.*, GROUP_CONCAT(i.link) AS images 
									FROM images i inner join product p ON i.id_product = p.id 
									where inCollection=1  OR new=1
									group by p.id  
									LIMIT 0,4 "
								);
	
	while ($row = $collection->fetch_object()){
		$assignees = explode(',', $row->images);
		$row->images = $assignees;
	    $product[] = $row;
	}
	$array = array('filter' => $product);

	echo (json_encode($array));
	
?>