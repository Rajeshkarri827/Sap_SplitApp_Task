sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("naruto.splitapptask.controller.View1", {
        onInit() {
            const oView = this.getView();
            const oModel = new JSONModel();
            oModel.loadData("../model/data.json");
            oView.setModel(oModel);

            oModel.dataLoaded().then(() => {
                var aOrders = oModel.getProperty("/Orders");
                if (aOrders && aOrders.length > 0) {
                    oView.byId("detailPage").bindElement("/Orders/0");

                    var oList = oView.byId("_IDGenList1");
                    var oFirstItem = oList.getItems()[0];
                    if (oFirstItem) {
                        oList.setSelectedItem(oFirstItem);
                    }
                }

                var oCountText = oView.byId("orderCountText");
                if (oCountText) {
                     oCountText.setText("Total Orders: " + (aOrders ? aOrders.length : 0));
                }
            });
        },

        onItemPress(oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const oCtx = oItem.getBindingContext();

            const oSplitApp = this.byId("SplitApp");
            const oDetailPage = this.byId("detailPage");

            oDetailPage.bindElement(oCtx.getPath());
            oSplitApp.toDetail(oDetailPage);
        }
    });
});
