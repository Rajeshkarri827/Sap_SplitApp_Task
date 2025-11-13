// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator"
// ], (Controller, JSONModel, Filter, FilterOperator) => {
//     "use strict";

//     return Controller.extend("naruto.splitapptask.controller.View1", {
//         onInit() {
//             const oView = this.getView();
//             const oModel = new JSONModel();
//             oModel.loadData("../model/data.json");
//             oView.setModel(oModel);

//             oModel.dataLoaded().then(() => {
//                 const aOrders = oModel.getProperty("/Orders");
//                 if (aOrders && aOrders.length > 0) {
//                     const oList = oView.byId("_IDGenList1");
//                     const oFirstItem = oList.getItems()[0];
//                     if (oFirstItem) {
//                         oList.setSelectedItem(oFirstItem);
//                     }

//                     const sCategory = aOrders[0].Category;
//                     this._showDetailForCategory(sCategory, "/Orders/0");
//                 }

//                 // const oCountText = oView.byId("orderCountText");
//                 // if (oCountText) {
//                 //     oCountText.setText("Total Orders: " + (aOrders ? aOrders.length : 0));
//                 // }
//             });
//         },

//         onUpdateFinish(oEvent){
//             var sCount= oEvent.getParameter("total") ;
//             this.byId("orderCountText").setText("TotalCount:" + sCount) ; 

//             // var oList = this.getView().byId("_IDGenList1");
//             // var oFirstItem = oList.getItems()[0];
//             //         if (oFirstItem) {
//             //             oList.setSelectedItem(oFirstItem);
//             //         }

//             // var oCategory=oFirstItem.getProperty("number");
//             //         if(oCategory) {

//             // _showDetailForCategory(sCategory, sPath) {

//             // var oItem = oEvent.getParameter("listItem");
//             // var oCtx = oItem.getBindingContext();
//             // var oData = oCtx.getObject();

//             // this._showDetailForCategory(oData.Category, oCtx.getPath());
            
            
//             //         }
//             //     }
//         },

//         onSearch(oEvent) {
//             let sQuery = oEvent.getParameter("query");
//             if (!sQuery) {
//                 sQuery = oEvent.getParameter("newValue");
//             }

//             const oList = this.byId("_IDGenList1");
//             const oBinding = oList.getBinding("items");

//             if (!sQuery || sQuery.trim() === "") {
//                 oBinding.filter([]);
//                 return;
//             }

//             const aFilters = [
//                 new Filter("OrderID", FilterOperator.Contains, sQuery),
//                 new Filter("CustomerName", FilterOperator.Contains, sQuery),
//                 new Filter("Category", FilterOperator.Contains, sQuery),
//                 new Filter("Status", FilterOperator.Contains, sQuery),
//                 new Filter("ShippingAddress/City", FilterOperator.Contains, sQuery),
//                 new Filter("ShippingAddress/Country", FilterOperator.Contains, sQuery)
//             ];

//             const oCombinedFilter = new Filter({
//                 filters: aFilters,
//                 and: false
//             });

//             oBinding.filter(oCombinedFilter);
//         },

//         onItemPress(oEvent) {
//             var oItem = oEvent.getParameter("listItem");
//             var oCtx = oItem.getBindingContext();
//             var oData = oCtx.getObject();

//             this._showDetailForCategory(oData.Category, oCtx.getPath());

//             var oSearchField = this.byId("searchField");
//             if (oSearchField) {
//                 oSearchField.setValue("");
//             }

//             const oList = this.byId("_IDGenList1");
//             const oBinding = oList.getBinding("items");
//             oBinding.filter([]);
//         },

//         _showDetailForCategory(sCategory, sPath) {
//             const oSplitApp = this.byId("SplitApp");
//             let sDetailPageId;

//             switch (sCategory) {
//                 case "Computer Peripherals":
//                     sDetailPageId = "detailPage_CP";
//                     break;
//                 case "Mobiles":
//                     sDetailPageId = "detailPage_MB";
//                     break;
//                 case "Music Systems":
//                     sDetailPageId = "detailPage_MS";
//                     break;
//                 default:
//                     sDetailPageId = "detailPage_CP";
//             }

//             const oDetailPage = this.byId(sDetailPageId);
//             if (oDetailPage) {
//                 oDetailPage.bindElement(sPath);
//                 oSplitApp.toDetail(oDetailPage);
//             }
//         }
//     });
// });



sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("naruto.splitapptask.controller.View1", {

        onInit: function() {
            var oView = this.getView();
            var oOrdersModel = new JSONModel();
            oOrdersModel.loadData("../model/data.json");
            oView.setModel(oOrdersModel);
        },

        onUpdateFinish: function(oEvent) {
            var oList = oEvent.getSource();
            var iTotalOrders = oEvent.getParameter("total") || 0;

            var oOrderCountText = this.byId("orderCountText");
            if (oOrderCountText) {
                oOrderCountText.setText("Total Orders: " + iTotalOrders);
            }

            var aVisibleItems = oList.getItems();
            if (aVisibleItems.length > 0) {
                var oFirstItem = aVisibleItems[0];
                oList.setSelectedItem(oFirstItem);

                var oItemContext = oFirstItem.getBindingContext();
                var oItemData = oItemContext.getObject();
                this._showDetailPage(oItemData.Category, oItemContext.getPath());
            }
        },

        onSearch: function(oEvent) {
            var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");

            var oList = this.byId("_IDGenList1");
            var oItemsBinding = oList.getBinding("items");

            if (!sQuery || sQuery.trim() === "") {
                oItemsBinding.filter([]);
                return;
            }

            var aFilters = [
                new Filter("OrderID", FilterOperator.Contains, sQuery),
                new Filter("CustomerName", FilterOperator.Contains, sQuery),
                new Filter("Category", FilterOperator.Contains, sQuery),
                new Filter("Status", FilterOperator.Contains, sQuery),
                new Filter("ShippingAddress/City", FilterOperator.Contains, sQuery),
                new Filter("ShippingAddress/Country", FilterOperator.Contains, sQuery)
            ];

            var oCombinedFilter = new Filter({ filters: aFilters, and: false });
            oItemsBinding.filter(oCombinedFilter);
        },

        onItemPress: function(oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");
            var oItemContext = oSelectedItem.getBindingContext();
            var oItemData = oItemContext.getObject();

            this._showDetailPage(oItemData.Category, oItemContext.getPath());
        },

        _showDetailPage: function(sCategory, sBindingPath) {
            var oSplitApp = this.byId("SplitApp");
            var sDetailPageId;

            switch (sCategory) {
                case "Computer Peripherals":
                    sDetailPageId = "detailPage_CP";
                    break;
                case "Mobiles":
                    sDetailPageId = "detailPage_MB";
                    break;
                case "Music Systems":
                    sDetailPageId = "detailPage_MS";
                    break;
                default:
                    sDetailPageId = "detailPage_CP";
            }

            var oDetailPage = this.byId(sDetailPageId);
            if (oDetailPage) {
                oDetailPage.bindElement(sBindingPath);
                oSplitApp.toDetail(oDetailPage);
            }
        }

    });
});
