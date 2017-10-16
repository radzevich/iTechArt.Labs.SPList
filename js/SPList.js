function SPList() {
    return {
        createListItem: function(siteUrl, listId, listTitle, itemToCreateFieldValuePair) {
            return new Promise((resolve, reject) => {
                var clientContext = new SP.ClientContext(siteUrl);
                var listOfItems = (listId) 
                    ? clientContext.get_web().get_lists().getById(listId)
                    : clientContext.get_web().get_lists().getByTitle(listTitle);
        
                var itemCreateInfo = new SP.ListItemCreationInformation();
                listItem = listOfItems.addItem(itemCreateInfo);
        
                for (var i = 0; i < itemToCreateFieldValuePair.length; i++) {
                    var itemPropertyField = itemToCreateFieldValuePair[i].field;
                    var itemPropertyValue = itemToCreateFieldValuePair[i].value;
        
                    listItem.set_item(itemPropertyField, itemPropertyValue);
                }
        
                listItem.update();       
                clientContext.load(listItem);
        
                clientContext.executeQueryAsync(() => {
                    resolve(listItem.get_id());
                }, (sender, args) => {
                    reject(args.get_message() + '\n' + args.get_stackTrace())
                });
            })
        },

        getListItem: function(siteUrl, listTitle, itemFieldsToLoad) {
            return new Promise((resolve, reject) => {
                var clientContext = new SP.ClientContext(siteUrl);
                var web = clientContext.get_web();
                var listOfItems = web.get_lists().getByTitle(listTitle);
        
                var query = new SP.CamlQuery();
                query.set_viewXml('');  
                var items = listOfItems.getItems(query);
        
                var fieldsToLoad = itemFieldsToLoad.join();
                clientContext.load(items, 'Include(' + fieldsToLoad + ')');
        
                clientContext.executeQueryAsync(() => {
                    resolve(mapCollectionToArray(items));
                }, (sender, args) => {
                    reject(args.get_message() + '\n' + args.get_stackTrace())
                });
            })
        },

        updateListItem: function(siteUrl, listId, listTitle, itemToUpdateId, itemToUpdateFieldValuePairs) {
            console.log(listId);
            return new Promise((resolve, reject) => {
                var clientContext = new SP.ClientContext(siteUrl);
                var listOfItems = (listId) 
                    ? clientContext.get_web().get_lists().getById(listId)
                    : clientContext.get_web().get_lists().getByTitle(listTitle);
        
                itemToUpdate = listOfItems.getItemById(itemToUpdateId);
        
                for (var i = 0; i < itemToUpdateFieldValuePairs.length; i++) {
                    var itemPropertyField = itemToUpdateFieldValuePairs[i].field;
                    var itemPropertyValue = itemToUpdateFieldValuePairs[i].value;
        
                    itemToUpdate.set_item(itemPropertyField, itemPropertyValue);
                }
        
                itemToUpdate.update();       
                clientContext.load(itemToUpdate);
        
                clientContext.executeQueryAsync(() => {
                    resolve(itemToUpdate.get_id());
                }, (sender, args) => {
                    reject(args.get_message() + '\n' + args.get_stackTrace())
                });
            })
        },
        
        deleteItemFromList: function(siteUrl, listId, listTitle, itemToDeleteId) {
            return new Promise((resolve, reject) => {
                var clientContext = new SP.ClientContext(siteUrl);
                var listOfItems = (listId) 
                    ? clientContext.get_web().get_lists().getById(listId)
                    : clientContext.get_web().get_lists().getByTitle(listTitle);
        
                itemToDelete = listOfItems.getItemById(itemToDeleteId);
                itemToDelete.deleteObject();       
        
                clientContext.executeQueryAsync(() => {
                    resolve();
                }, (sender, args) => {
                    reject(args.get_message() + '\n' + args.get_stackTrace())
                });
            })
        },
    }

    const mapCollectionToArray = (collection) => {
        const enumerator = collection.getEnumerator();
        const targetArray = [];
    
        while(enumerator.moveNext()) {
            const currentItem = enumerator.get_current();
            targetArray.push(currentItem.get_fieldValues());
        }
    
        return targetArray;
    } 
}