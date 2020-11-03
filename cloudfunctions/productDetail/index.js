// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    traceUser: true,
    env: 'weixinshangcheng-45ee6c',
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const id = event.id

    console.log('id', id)
    // product detail
    const productRes = await db.collection('product').doc(id).get()
    console.log('productRes', productRes)

    const product = productRes.data

    return product
}