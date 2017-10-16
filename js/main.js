(function () {
	const config = new Config();

	const url = config.siteUrl;
	const listTile = config.listTitle;
	const listColumns = config.listColumnsInfo;

	const spList = new SPList(); 
	var listOfItems = [];

	function createTable($rootElement) {
		tableRoot = '<table class="book-store__table">';

		const internalColumnNames = listColumns.map(column => column.internalName)

		spList.getListItem(siteUrl, listTitle, internalColumnNames)
		.then(function(listOfItemsData) {
			listOfItems = listOfItemsData;
		})
		.catch(function(errorMessage) {
			console.log(errorMessage)
		});

		tableRoot.concat('</table>');
	}

	function createColumnNamesRow(tableColumns) {
		var columnNamesRow = '<tr>';
		tableColumns.map(column => {
			columnNamesRow.concat(tableColumns.displayName);
		})
		columnNamesRow.concat('</tr>');

		return columnNamesRow;
	}

	function createTableRow(columnsInfo, itemDataToDisplay) {
		var tableRow = '<tr class="table__row">'

		columnsInfo.map(column => {
			const dataToDisplay = itemDataToDisplay[column.intenalName];
			switch (column.type) {
				case 'text': 
					tableRow.concat(createTextBox(dataToDisplay));
				case 'choice':
					tableRow.concat(createDropDown(dataToDisplay));
				case 'lookup':
					tableRow.concat(createLookup(dataToDisplay));
			}
		})
		tableRow.concat(createSaveButton(itemDataToDisplay['ID']));
		tableRow.concat('</tr>');		
		return tableRow;
	}

	function createTextBox(valueToInitialize) {
		return '<td class="table__item"><textarea>' + valueToInitialize + '</textarea></td>'; 
	}

	function createLabel(valueToInitialize) {
		return '<td class="table__item"><label>' + valueToInitialize + '</label></td>' 
	}

	function createDropDown(dropDownOptions, valueToInitialize) {
		var selectMenu = '<select class="table__item" name="select_menu">';
		for (var i = 0; i < dropDownOptions.length; i++) {
			const option = '<option value=' + dropDownOptions[i] + '>' + dropDownOptions[i] + '</option>';
			selectMenu.concat(option);
		}
		selectMenu.concat('</select>');

		return selectMenu;
	}

	function createLookup(mutableValue, immutableValue) {
		return 
			'<td class="table__item"><textarea>' + mutableValue + '</textarea><label>' + immutableValue + '</label><td>';
	}

	function createSaveButton(itemToSaveId) {
		return '<td><button class="save-button" onClick="handleSaveButtonClick(' + itemToSaveId + ')">Save</button></td>';
	}

	function handleSaveButtonClick(itemToSaveId) {

	}

	$(document).ready(function() {
		const $rootElement = $('.books-store');

		ExecuteOrDelayUntilScriptLoaded(function() {
			if ($rootElement != null) {
				createTable($rootElement);
			}
		}, "sp.js");
	});
})();