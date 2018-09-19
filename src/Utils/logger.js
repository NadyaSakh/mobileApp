/* eslint-disable no-console */
export const LOG = (message, title) => {
    console.log('===========================================')
    console.log(`${ title ? title : 'LOG' }`)
    console.log(message)
    console.log('===========================================')
}