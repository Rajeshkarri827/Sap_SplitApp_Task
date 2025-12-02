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

//         // onUpdateFinish: function (oEvent) {
//         //     var oList = oEvent.getSource();
//         //     var oCountText = this.byId("orderCountText");

//         //     oCountText.setText("Total Orders: " + (oEvent.getParameter("total") || 0));

//         //     var aItems = oList.getItems();
//         //     if (aItems.length > 0) {
//         //         var oFirst = aItems[0];
//         //         oList.setSelectedItem(oFirst);

//         //         var ctx = oFirst.getBindingContext();
//         //         this._showDetailPage(ctx.getObject().Category, ctx.getPath());
//         //     }
//         // },
//         onUpdateFinish: function (oEvent) {
//                  var oList = oEvent.getSource();
//                  var oCountText = this.byId("orderCountText");
//                  var iTotal = oEvent.getParameter("total") || 0;

//                  oCountText.setText("Total Orders: " + iTotal);

//                  var oSplitApp = this.byId("SplitApp");

//                  if (iTotal === 0) {
//                  var oNoDataPage = this.byId("detailPage_NoData");
//                  oSplitApp.toDetail(oNoDataPage);
//                 } else {
//                     var aItems = oList.getItems();
//                     if (aItems.length > 0) {
//                     var oFirst = aItems[0];
//                     oList.setSelectedItem(oFirst);

//                     var ctx = oFirst.getBindingContext();
//                     this._showDetailPage(ctx.getObject().Category, ctx.getPath());
//                     }
//                 }
//             },

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
//             var sId = sap.ui.getCore ().byId("orderIdInput").getValue();
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

//         onClearFilter: function () {
//             var oList = this.byId("orderList");
//             var oBinding = oList.getBinding("items");

//             oBinding.filter([]);
        
//             this.byId("searchField").setValue("");
//             if (this.oFilterDialog) {
//                 sap.ui.getCore().byId("orderIdInput").setValue("");
//                 sap.ui.getCore().byId("customerNameInput").setValue("");
//                 sap.ui.getCore().byId("categoryInput").setValue("");
//             }
//         },

//             _showDetailPage: function (sCategory, sPath) {
//                 var oSplitApp = this.byId("SplitApp");
//                 var sPageId = "";
                
//                 switch (sCategory) {
//                     case "Computer Peripherals":
//                          sPageId = "detailPage_CP";
//                           break;
//                     case "Mobiles":
//                          sPageId = "detailPage_MB"; 
//                          break;
//                     case "Music Systems":
//                          sPageId = "detailPage_MS"; 
//                          break;
//                     default:
//                          sPageId = "detailPage_CP";
//                 }

//                 var oPage = this.byId(sPageId);
//                 oPage.bindElement(sPath);
//                 oSplitApp.toDetail(oPage);
//             }
        

//     });
// });

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
//             var iTotal = oEvent.getParameter("total") || 0;

//             oCountText.setText("Total Orders: " + iTotal);

//             var oSplitApp = this.byId("SplitApp");

//             if (iTotal === 0) {
//                 var oNoDataPage = this.byId("detailPage_NoData");
//                 oSplitApp.toDetail(oNoDataPage);
//             } else {
//                 var aItems = oList.getItems();
//                 if (aItems.length > 0) {
//                     var oFirst = aItems[0];
//                     oList.setSelectedItem(oFirst);

//                     var ctx = oFirst.getBindingContext();
//                     this._showDetailPage(ctx.getObject().Category, ctx.getPath());
//                 }
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

//         onItemPress: function (oEvent) {
//             var ctx = oEvent.getParameter("listItem").getBindingContext();
//             this._showDetailPage(ctx.getObject().Category, ctx.getPath());
//         },

//         onClearFilter: function () {
//             var oList = this.byId("orderList");
//             oList.getBinding("items").filter([]);

//             this.byId("searchField").setValue("");
//             if (this.oFilterDialog) {
//                 sap.ui.getCore().byId("orderIdInput").setValue("");
//                 sap.ui.getCore().byId("customerNameInput").setValue("");
//                 sap.ui.getCore().byId("categoryInput").setValue("");
//             }
//         },

//         _showDetailPage: function (sCategory, sPath) {
//             var oSplitApp = this.byId("SplitApp");
//             var sPageId = "";

//             switch (sCategory) {
//                 case "Computer Peripherals": sPageId = "detailPage_CP"; 
//                 break;

//                 case "Mobiles": sPageId = "detailPage_MB"; 
//                 break;

//                 case "Music Systems": sPageId = "detailPage_MS";
//                 break;

//                 default: sPageId = "detailPage_NoData";
//             }

//             var oPage = this.byId(sPageId);
//             oPage.bindElement(sPath);
//             oSplitApp.toDetail(oPage);
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

//         onOrderIdValueHelp: function () {
//             if (!this.oOrderIDDialog) {
//                 Fragment.load({
//                     name: "naruto.splitapptask.Fragment.OrderIDValueHelp",
//                     controller: this
//                 }).then(function (oDialog) {
//                     this.oOrderIDDialog = oDialog;
//                     this.getView().addDependent(oDialog);
//                     this._openValueHelpDialog(oDialog, "OrderID");
//                 }.bind(this));
//             } else {
//                 this._openValueHelpDialog(this.oOrderIDDialog, "OrderID");
//             }
//         },

//         onCustomerNameValueHelp: function () {
//             if (!this.oCustomerNameDialog) {
//                 Fragment.load({
//                     name: "naruto.splitapptask.Fragment.CustomerNameValueHelp",
//                     controller: this
//                 }).then(function (oDialog) {
//                     this.oCustomerNameDialog = oDialog;
//                     this.getView().addDependent(oDialog);
//                     this._openValueHelpDialog(oDialog, "CustomerName");
//                 }.bind(this));
//             } else {
//                 this._openValueHelpDialog(this.oCustomerNameDialog, "CustomerName");
//             }
//         },


//         onCategoryValueHelp: function () {
//             var oView = this.getView();

//             var aOrders = oView.getModel().getProperty("/Orders");
//             var oUniqueCategories = {};
//             aOrders.forEach(function(oOrder) {
//                 oUniqueCategories[oOrder.Category] = true;
//             });

//             var aCategoryItems = Object.keys(oUniqueCategories).map(function(sCategory) {
//                 return { Category: sCategory };
//             });

//             var oCategoryModel = new sap.ui.model.json.JSONModel({ Categories: aCategoryItems });

//             if (!this.oCategoryDialog) {
//                 Fragment.load({
//                     name: "naruto.splitapptask.Fragment.CategoryValueHelp",
//                     controller: this
//                 }).then(function (oDialog) {
//                     this.oCategoryDialog = oDialog;
//                     this.getView().addDependent(oDialog);
//                     this.oCategoryDialog.setModel(oCategoryModel);
//                     this.oCategoryDialog.open();
//                 }.bind(this));
//             } else {
//                 this.oCategoryDialog.setModel(oCategoryModel);
//                 this.oCategoryDialog.open();
//             }

//             this.oCategoryDialog.attachConfirm(function (oEvent) {
//                 var oSelected = oEvent.getParameter("selectedItem");
//                 if (oSelected) {
//                     sap.ui.getCore().byId("categoryInput").setValue(oSelected.getTitle());
//                 }
//             });
//         },

//         _openValueHelpDialog: function(oDialog, sField) {
//             var sOrderID = sap.ui.getCore().byId("orderIdInput").getValue();
//             var sCustomer = sap.ui.getCore().byId("customerNameInput").getValue();
//             var sCategory = sap.ui.getCore().byId("categoryInput").getValue();

//             var aFilters = [];
//             if (sField !== "OrderID" && sOrderID) aFilters.push(new Filter("OrderID", FilterOperator.EQ, sOrderID));
//             if (sField !== "CustomerName" && sCustomer) aFilters.push(new Filter("CustomerName", FilterOperator.EQ, sCustomer));
//             if (sField !== "Category" && sCategory) aFilters.push(new Filter("Category", FilterOperator.EQ, sCategory));

//             oDialog.getBinding("items").filter(aFilters);

//             oDialog.open();

//             oDialog.attachConfirm(function (oEvent) {
//                 var oSelected = oEvent.getParameter("selectedItem");
//                 if (oSelected) {
//                     switch (sField) {
//                         case "OrderID":
//                             sap.ui.getCore().byId("orderIdInput").setValue(oSelected.getTitle());
//                             break;
//                         case "CustomerName":
//                             sap.ui.getCore().byId("customerNameInput").setValue(oSelected.getTitle());
//                             break;
//                         case "Category":
//                             sap.ui.getCore().byId("categoryInput").setValue(oSelected.getTitle());
//                             break;
//                     }
//                 }
//             });
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

        onItemPress: function (oEvent) {
            var ctx = oEvent.getParameter("listItem").getBindingContext();
            this._showDetailPage(ctx.getObject().Category, ctx.getPath());
        },

        onClearFilter: function () {
            var oList = this.byId("orderList");
            oList.getBinding("items").filter([]);

            this.byId("searchField").setValue("");

            if (this.oFilterDialog) {
                this.byId("orderIdInput").setValue("");
                this.byId("customerNameInput").setValue("");
                this.byId("categoryInput").setValue("");
            }
        },

        _showDetailPage: function (sCategory, sPath) {
            var oSplitApp = this.byId("SplitApp");
            var sPageId = "";

            switch (sCategory) {
                case "Computer Peripherals": sPageId = "detailPage_CP"; break;
                case "Mobiles": sPageId = "detailPage_MB"; break;
                case "Music Systems": sPageId = "detailPage_MS"; break;
                default: sPageId = "detailPage_NoData";
            }

            var oPage = this.byId(sPageId);
            oPage.bindElement(sPath);
            oSplitApp.toDetail(oPage);
        },

        onOpenfilter: function () {
            if (!this.oFilterDialog) {
                Fragment.load({
                    id: this.getView().getId(),
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
            var sId = this.byId("orderIdInput").getValue();
            var sName = this.byId("customerNameInput").getValue();
            var sCategory = this.byId("categoryInput").getValue();

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

        onOrderIdValueHelp: function () {
            if (!this.oOrderIDDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "naruto.splitapptask.Fragment.OrderIDValueHelp",
                    controller: this
                }).then(function (oDialog) {
                    this.oOrderIDDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    this._openValueHelpDialog(oDialog, "OrderID");
                }.bind(this));
            } else {
                this._openValueHelpDialog(this.oOrderIDDialog, "OrderID");
            }
        },

        onCustomerNameValueHelp: function () {
            if (!this.oCustomerNameDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "naruto.splitapptask.Fragment.CustomerNameValueHelp",
                    controller: this
                }).then(function (oDialog) {
                    this.oCustomerNameDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    this._openValueHelpDialog(oDialog, "CustomerName");
                }.bind(this));
            } else {
                this._openValueHelpDialog(this.oCustomerNameDialog, "CustomerName");
            }
        },

        onCategoryValueHelp: function () {
            var oView = this.getView();

            var sOrderID = this.byId("orderIdInput").getValue();
            var sCustomer = this.byId("customerNameInput").getValue();

            var aOrders = oView.getModel().getProperty("/Orders");

            var aFiltered = aOrders.filter(function (oOrder) {
                return (!sOrderID || oOrder.OrderID.includes(sOrderID)) &&
                       (!sCustomer || oOrder.CustomerName.includes(sCustomer));
            });

            var oUniqueCategories = {};
            aFiltered.forEach(function(oOrder) {
                oUniqueCategories[oOrder.Category] = true;
            });

            var aCategoryItems = Object.keys(oUniqueCategories).map(function(sCategory) {
                return { Category: sCategory };
            });

            var oCategoryModel = new JSONModel({ Categories: aCategoryItems });

            if (!this.oCategoryDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "naruto.splitapptask.Fragment.CategoryValueHelp",
                    controller: this
                }).then(function (oDialog) {
                    this.oCategoryDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    this.oCategoryDialog.setModel(oCategoryModel);
                    this.oCategoryDialog.open();
                }.bind(this));
            } else {
                this.oCategoryDialog.setModel(oCategoryModel);
                this.oCategoryDialog.open();
            }

            this.oCategoryDialog.attachConfirm(function (oEvent) {
                var oSelected = oEvent.getParameter("selectedItem");
                if (oSelected) {
                    this.byId("categoryInput").setValue(oSelected.getTitle());
                }
            }.bind(this));
        },

        _openValueHelpDialog: function(oDialog, sField) {
            var sOrderID = this.byId("orderIdInput").getValue();
            var sCustomer = this.byId("customerNameInput").getValue();
            var sCategory = this.byId("categoryInput").getValue();

            var aFilters = [];
            if (sField !== "OrderID" && sOrderID) aFilters.push(new Filter("OrderID", FilterOperator.EQ, sOrderID));
            if (sField !== "CustomerName" && sCustomer) aFilters.push(new Filter("CustomerName", FilterOperator.EQ, sCustomer));
            if (sField !== "Category" && sCategory) aFilters.push(new Filter("Category", FilterOperator.EQ, sCategory));

            oDialog.getBinding("items").filter(aFilters);

            oDialog.open();

            oDialog.attachConfirm(function (oEvent) {
                var oSelected = oEvent.getParameter("selectedItem");
                if (oSelected) {
                    switch (sField) {
                        case "OrderID":
                            this.byId("orderIdInput").setValue(oSelected.getTitle());
                            break;
                        case "CustomerName":
                            this.byId("customerNameInput").setValue(oSelected.getTitle());
                            break;
                        case "Category":
                            this.byId("categoryInput").setValue(oSelected.getTitle());
                            break;
                    }
                }
            }.bind(this));
        }

    });
});

