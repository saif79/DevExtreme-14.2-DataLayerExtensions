﻿/// <reference path="../js/jquery-1.11.1.min.js" />
/// <reference path="../js/knockout-3.2.0.js" />
/// <reference path="../js/dx.all.js" />

(function() {
    "use strict";
    var dataNS = DevExpress.data;

    window.db = new DataService.NORTHWND({
        provider: "oData",
        oDataServiceHost: "http://localhost:54509/dataservice.svc/"
    });

    WebUI.ProductViewModel = function (data) {
        this.ProductID = ko.observable();
        this.ProductName = ko.observable();
        this.SupplierID = ko.observable();
        this.CategoryID = ko.observable();
        this.QuantityPerUnit = ko.observable();
        this.UnitPrice = ko.observable();
        this.UnitsInStock = ko.observable();
        this.UnitsOnOrder = ko.observable();
        this.ReorderLevel = ko.observable();
        this.Discontinued = ko.observable();

        this.Category = new WebUI.CategoryViewModel();
        this.Supplier = new WebUI.SupplierViewModel();

        if (data)
            this.fromJS(data);

        this.UnitPriceFormatted = ko.computed(function () {
            return Globalize.format(this.UnitPrice(), "c");
        }, this);
    };

    $.extend(WebUI.ProductViewModel.prototype, {
        toJS: function () {
            return {
                ProductID: this.ProductID(),
                ProductName: this.ProductName(),
                SupplierID: this.SupplierID(),
                CategoryID: this.CategoryID(),
                QuantityPerUnit: this.QuantityPerUnit(),
                UnitPrice: String(this.UnitPrice() || 0),
                UnitsInStock: this.UnitsInStock(),
                UnitsOnOrder: this.UnitsOnOrder(),
                ReorderLevel: this.ReorderLevel(),
                Discontinued: this.Discontinued(),
            };
        },

        fromJS: function (data) {
            if (data) {
                this.ProductID(data.ProductID);
                this.ProductName(data.ProductName);
                this.SupplierID(data.SupplierID);
                this.CategoryID(data.CategoryID);
                this.QuantityPerUnit(data.QuantityPerUnit);
                this.UnitPrice(Number(data.UnitPrice));
                this.UnitsInStock(data.UnitsInStock);
                this.UnitsOnOrder(data.UnitsOnOrder);
                this.ReorderLevel(data.ReorderLevel);
                this.Discontinued(data.Discontinued);

                this.Category.fromJS(data.Category);
                this.Supplier.fromJS(data.Supplier);
            }
        }
    });

    WebUI.SupplierViewModel = function (data) {
        this.SupplierID = ko.observable();
        this.CompanyName = ko.observable();
        this.ContactName = ko.observable();
        this.ContactTitle = ko.observable();
        this.Address = ko.observable();
        this.City = ko.observable();
        this.Region = ko.observable();
        this.PostalCode = ko.observable();
        this.Country = ko.observable();
        this.Phone = ko.observable();
        this.Fax = ko.observable();
        this.HomePage = ko.observable();
        if (data)
            this.fromJS(data);
    };

    $.extend(WebUI.SupplierViewModel.prototype, {
        toJS: function () {
            return {
                SupplierID: this.SupplierID(),
                CompanyName: this.CompanyName(),
                ContactName: this.ContactName(),
                ContactTitle: this.ContactTitle(),
                Address: this.Address(),
                City: this.City(),
                Region: this.Region(),
                PostalCode: this.PostalCode(),
                Country: this.Country(),
                Phone: this.Phone(),
                Fax: this.Fax(),
                HomePage: this.HomePage(),
            };
        },

        fromJS: function (data) {
            if (data) {
                this.SupplierID(data.SupplierID);
                this.CompanyName(data.CompanyName);
                this.ContactName(data.ContactName);
                this.ContactTitle(data.ContactTitle);
                this.Address(data.Address);
                this.City(data.City);
                this.Region(data.Region);
                this.PostalCode(data.PostalCode);
                this.Country(data.Country);
                this.Phone(data.Phone);
                this.Fax(data.Fax);
                this.HomePage(data.HomePage);

            }
        }
    });

    WebUI.CategoryViewModel = function (data) {
        this.CategoryID = ko.observable();
        this.CategoryName = ko.observable();
        this.Description = ko.observable();
        this.Picture = ko.observable();
        if (data)
            this.fromJS(data);
    };

    $.extend(WebUI.CategoryViewModel.prototype, {
        toJS: function () {
            return {
                CategoryID: this.CategoryID(),
                CategoryName: this.CategoryName(),
                Description: this.Description(),
                Picture: this.Picture(),
            };
        },

        fromJS: function (data) {
            if (data) {
                this.CategoryID(data.CategoryID);
                this.CategoryName(data.CategoryName);
                this.Description(data.Description);
                this.Picture(data.Picture);
            }
        }
    });

    db.onReady().done(function () {
        WebUI.db = {
            categories: new dataNS.JayDataStore({ queryable: db.Categories, autoCommit: true }),
            suppliers: new dataNS.JayDataStore({ queryable: db.Suppliers, autoCommit: true }),
            products: new dataNS.JayDataStore({ queryable: db.Products, autoCommit: true })
        };
    });
})();