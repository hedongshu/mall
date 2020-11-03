const util = require('./util')

const db = wx.cloud.database({
    env: 'weixinshangcheng-45ee6c'
})

module.exports = {
    getProductList() {
        return db.collection('product').where({}).get()
    },

    getProductDetail(id) {
        return wx.cloud.callFunction({
            name: 'productDetail',
            data: {
                id
            },
        })
    },

    getOrderList() {
        return wx.cloud.callFunction({
            name: 'getOrderList'
        })
    },

    addOrder(data) {
        return util.isAuthenticated()
            .then(() => {
                return wx.cloud.callFunction({
                    name: 'addOrder',
                    data,
                })
            })
            .catch(() => {
                wx.showToast({
                    icon: 'none',
                    title: '请先登录'
                })
                return {}
            })
    },

    getTrolleyList() {
        return wx.cloud.callFunction({
            name: 'getTrolleyList'
        })
    },

    addTrolley(data) {
        return util.isAuthenticated()
            .then(() => {
                return wx.cloud.callFunction({
                    name: 'addTrolley',
                    data,
                })
            })
            .catch(() => {
                wx.showToast({
                    icon: 'none',
                    title: '请先登录'
                })
                return {}
            })
    },

    updateTrolley(list) {
        return util.isAuthenticated()
            .then(() => {
                return wx.cloud.callFunction({
                    name: 'updateTrolley',
                    data: {
                        list,
                    },
                })
            }).catch(() => {
                wx.showToast({
                    icon: 'none',
                    title: '请先登录'
                })
                return {}
            })
    },

    addComment(data) {
        return util.isAuthenticated()
            .then(() => {
                return wx.cloud.callFunction({
                    name: 'addComment',
                    data,
                })
            }).catch(() => {
                wx.showToast({
                    icon: 'none',
                    title: 'Please Login First'
                })
                return {}
            })
    },

    getComments(productId) {
        return db.collection('review').where({
            productId,
        }).get()
    },

    uploadImage(imgPath) {
        return wx.cloud.uploadFile({
            cloudPath: `review/${util.getId()}`,
            filePath: imgPath,
        })
    }

}