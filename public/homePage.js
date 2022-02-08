let exit = new LogoutButton();
exit.action = () => {
    ApiConnector.logout((check) => {
        location.reload();
    })
}

 ApiConnector.current((check) => {
    if (check.success) {
        ProfileWidget.showProfile(check.data)
    }
})

let ExchangeRates = new RatesBoard();

function responseExchangeRates () {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ExchangeRates.clearTable()
            ExchangeRates.fillTable(response.data)
        }
    })

}

responseExchangeRates()
let interval = setInterval(responseExchangeRates, 60000);

let doingMoney = new MoneyManager();

doingMoney.addMoneyCallback = (response) => {
    console.log(response)
ApiConnector.addMoney(response, (check) => {
    console.log(check)
    if(check.success) {

        ProfileWidget.showProfile(check.data);
        doingMoney.setMessage(check.success, 'Операция выполнена успешно' )
    } else {
        doingMoney.setMessage(check.success, check.error )
    }
})
}

doingMoney.conversionMoneyCallback = (response) => {
    console.log(response)
    ApiConnector.convertMoney(response, (check) => {
        console.log(check)
        if(check.success) {

            ProfileWidget.showProfile(check.data);
            doingMoney.setMessage(check.success, 'Операция выполнена успешно' )
        } else {
            doingMoney.setMessage(check.success, check.error )
        }
    })
}

doingMoney.sendMoneyCallback = (response) => {
    console.log(response)
    ApiConnector.transferMoney(response, (check) => {
        console.log(check)
        if(check.success) {

            ProfileWidget.showProfile(check.data);
            doingMoney.setMessage(check.success, 'Операция выполнена успешно' )
        } else {
            doingMoney.setMessage(check.success, check.error )
        }
    })
}

let Favorites = new FavoritesWidget();
ApiConnector.getFavorites( (response) => {
    if(response.success) {
        Favorites.clearTable();
        Favorites.fillTable(response.data)
        doingMoney.updateUsersList(response.data)
    }
})

Favorites.addUserCallback = (response) => {
ApiConnector.addUserToFavorites(response, (check) => {
    console.log(check)
    if(check.success) {
        Favorites.clearTable();
        Favorites.fillTable(check.data)
        doingMoney.updateUsersList(check.data)
        doingMoney.setMessage(check.success, 'Пользователь добавлен в адресную книгу' )
    } else {
        doingMoney.setMessage(check.success, check.error )
    }

})
}

Favorites.removeUserCallback = (response) => {
    ApiConnector.removeUserFromFavorites(response, (check) => {
        console.log(check)
        if(check.success) {
            Favorites.clearTable();
            Favorites.fillTable(check.data)
            doingMoney.updateUsersList(check.data)
            doingMoney.setMessage(check.success, 'Пользователь удален из адресную книгу' )
        } else {
            doingMoney.setMessage(check.success, check.error )
        }

    })
}