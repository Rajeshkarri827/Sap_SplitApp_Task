// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator",
//     "sap/ui/core/Fragment"
// ], function (Controller, JSONModel, Filter, FilterOperator, Fragment) {
//     "use strict";

//     return Controller.extend("naruto.splitapptask.controller.View1", {

//         onInit: function () {
//             var oOrdersModel = new JSONModel();
//             oOrdersModel.loadData("../model/data.json");
//             this.getView().setModel(oOrdersModel);
//         },

//         onUpdateFinish: function (oEvent) {
//             var oList = oEvent.getSource();
//             var oCountText = this.byId("orderCountText");

//             oCountText.setText("Total Orders: " + (oEvent.getParameter("total") || 0));

//             var aItems = oList.getItems();
//             if (aItems.length > 0) {
//                 var oFirst = aItems[0];
//                 oList.setSelectedItem(oFirst);

//                 var ctx = oFirst.getBindingContext();
//                 this._showDetailPage(ctx.getObject().Category, ctx.getPath());
//             }
//         },

//         onSearch: function (oEvent) {
//             var sQuery = oEvent.getParameter("newValue");
//             var oList = this.byId("orderList");
//             var oBinding = oList.getBinding("items");

//             if (!sQuery) {
//                 oBinding.filter([]);
//                 return;
//             }

//             var aFilters = [
//                 new Filter("OrderID", FilterOperator.Contains, sQuery),
//                 new Filter("CustomerName", FilterOperator.Contains, sQuery),
//                 new Filter("Category", FilterOperator.Contains, sQuery),
//                 new Filter("Status", FilterOperator.Contains, sQuery),
//                 new Filter("ShippingAddress/City", FilterOperator.Contains, sQuery),
//                 new Filter("ShippingAddress/Country", FilterOperator.Contains, sQuery)
//             ];

//             oBinding.filter(new Filter({ filters: aFilters, and: false }));
//         },

//         onOpenfilter: function () {
//             if (!this.oFilterDialog) {
//                 Fragment.load({
//                     name: "naruto.splitapptask.Fragment.filter",
//                     controller: this
//                 }).then(function (oDialog) {
//                     this.oFilterDialog = oDialog;
//                     this.getView().addDependent(oDialog);
//                     oDialog.open();
//                 }.bind(this));
//             } else {
//                 this.oFilterDialog.open();
//             }
//         },

//         onApply: function () {
//             var sId = sap.ui.getCore().byId("orderIdInput").getValue();
//             var sName = sap.ui.getCore().byId("customerNameInput").getValue();
//             var sCategory = sap.ui.getCore().byId("categoryInput").getValue();

//             var aFilters = [];
//             if (sId) aFilters.push(new Filter("OrderID", FilterOperator.Contains, sId));
//             if (sName) aFilters.push(new Filter("CustomerName", FilterOperator.Contains, sName));
//             if (sCategory) aFilters.push(new Filter("Category", FilterOperator.Contains, sCategory));

//             this.byId("orderList").getBinding("items").filter(aFilters);
//             this.oFilterDialog.close();
//         },

//         onCancel: function () {
//             this.oFilterDialog.close();
//         },

//         onItemPress: function (oEvent) {
//             var ctx = oEvent.getParameter("listItem").getBindingContext();
//             this._showDetailPage(ctx.getObject().Category, ctx.getPath());
//         },

//         _showDetailPage: function (sCategory, sPath) {
//             var oSplitApp = this.byId("SplitApp");
//             var sPageId = "";

//             switch (sCategory) {
//                 case "Computer Peripherals": sPageId = "detailPage_CP"; break;
//                 case "Mobiles": sPageId = "detailPage_MB"; break;
//                 case "Music Systems": sPageId = "detailPage_MS"; break;
//                 default: sPageId = "detailPage_CP";
//             }

//             var oPage = this.byId(sPageId);
//             oPage.bindElement(sPath);
//             oSplitApp.toDetail(oPage);
//         }

//     });
// });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
], function (Controller, JSONModel, Filter, FilterOperator, Fragment) {
    "use strict";

    return Controller.extend("naruto.splitapptask.controller.View1", {

        onInit: function () {
            var oOrdersModel = new JSONModel();
            oOrdersModel.loadData("../model/data.json");
            this.getView().setModel(oOrdersModel);
        },

        // onUpdateFinish: function (oEvent) {
        //     var oList = oEvent.getSource();
        //     var oCountText = this.byId("orderCountText");

        //     oCountText.setText("Total Orders: " + (oEvent.getParameter("total") || 0));

        //     var aItems = oList.getItems();
        //     if (aItems.length > 0) {
        //         var oFirst = aItems[0];
        //         oList.setSelectedItem(oFirst);

        //         var ctx = oFirst.getBindingContext();
        //         this._showDetailPage(ctx.getObject().Category, ctx.getPath());
        //     }
        // },
        onUpdateFinish: function (oEvent) {
                 var oList = oEvent.getSource();
                 var oCountText = this.byId("orderCountText");
                 var iTotal = oEvent.getParameter("total") || 0;

                 oCountText.setText("Total Orders: " + iTotal);

                 var oSplitApp = this.byId("SplitApp");

                 if (iTotal === 0) {
                 var oNoDataPage = this.byId("detailPage_NoData");
                 oSplitApp.toDetail(oNoDataPage);
                } else {
                    var aItems = oList.getItems();
                    if (aItems.length > 0) {
                    var oFirst = aItems[0];
                    oList.setSelectedItem(oFirst);

                    var ctx = oFirst.getBindingContext();
                    this._showDetailPage(ctx.getObject().Category, ctx.getPath());
                    }
                }
            },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var oList = this.byId("orderList");
            var oBinding = oList.getBinding("items");

            if (!sQuery) {
                oBinding.filter([]);
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

            oBinding.filter(new Filter({ filters: aFilters, and: false }));
        },

        onOpenfilter: function () {
            if (!this.oFilterDialog) {
                Fragment.load({
                    name: "naruto.splitapptask.Fragment.filter",
                    controller: this
                }).then(function (oDialog) {
                    this.oFilterDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this.oFilterDialog.open();
            }
        },

        onApply: function () {
            var sId = sap.ui.getCore ().byId("orderIdInput").getValue();
            var sName = sap.ui.getCore().byId("customerNameInput").getValue();
            var sCategory = sap.ui.getCore().byId("categoryInput").getValue();

            var aFilters = [];
            if (sId) aFilters.push(new Filter("OrderID", FilterOperator.Contains, sId));
            if (sName) aFilters.push(new Filter("CustomerName", FilterOperator.Contains, sName));
            if (sCategory) aFilters.push(new Filter("Category", FilterOperator.Contains, sCategory));

            this.byId("orderList").getBinding("items").filter(aFilters);
            this.oFilterDialog.close();
        },

        onCancel: function () {
            this.oFilterDialog.close();
        },

        onItemPress: function (oEvent) {
            var ctx = oEvent.getParameter("listItem").getBindingContext();
            this._showDetailPage(ctx.getObject().Category, ctx.getPath());
        },

        onClearFilter: function () {
            var oList = this.byId("orderList");
            var oBinding = oList.getBinding("items");

            oBinding.filter([]);
        
            this.byId("searchField").setValue("");
            if (this.oFilterDialog) {
                sap.ui.getCore().byId("orderIdInput").setValue("");
                sap.ui.getCore().byId("customerNameInput").setValue("");
                sap.ui.getCore().byId("categoryInput").setValue("");
            }
        },

            _showDetailPage: function (sCategory, sPath) {
                var oSplitApp = this.byId("SplitApp");
                var sPageId = "";
                
                switch (sCategory) {
                    case "Computer Peripherals":
                         sPageId = "detailPage_CP";
                          break;
                    case "Mobiles":
                         sPageId = "detailPage_MB"; 
                         break;
                    case "Music Systems":
                         sPageId = "detailPage_MS"; 
                         break;
                    default:
                         sPageId = "detailPage_CP";
                }

                var oPage = this.byId(sPageId);
                oPage.bindElement(sPath);
                oSplitApp.toDetail(oPage);
            }
        

    });
});
