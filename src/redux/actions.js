// 1. Declarar la propiedad en el objeto actions
// 2. Crear el case con la propiedad creada en 1
// 3. Hacer la función que retorne la accion
// 4. Despachar la función en un componente o thunk

import axios from "axios"

export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
    setPurchases: "SET_PURCHASES"
}


const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

/*------------------ACTIONS---------------------*/

/* GET PRODUCTS FROM API */
export const setProducts = (products) => ({
    type: actions.setProducts,
    payload: products
})
//-------------------------FUNCTION TOKEN---------------------------




/*CHARGE SCREEN*/
export const setIsLoading = (isLoading) => ({
    type: actions.setIsLoading,
    payload: isLoading
})

/*SET CATEGORIES FROM API*/
export const setCategories = (categories) => ({
    type: actions.setCategories,
    payload: categories
})

export const setPurchases = (purchases) => ({
    type: actions.setPurchases,
    payload: purchases
})

/*-------------------THUNKS---------------------*/

/* GET PRODUCTS FROM API */
export const getProductsThunk = () => {
    return (dispatch) => {
        dispatch(setIsLoading(true))
            return axios
            .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
            .then((res) => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)))
    }   
}

/* GET CATEGORIES FROM API */
export const getCategoriesThunk = () => {
    return (dispatch) => {
        dispatch (setIsLoading(true))
        return axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/")
        .then((res) => dispatch(setCategories(res.data.data.categories)))
        .finally(() => dispatch(setIsLoading(false)))
    }
}

/* FILTER CATEGORIES FROM API */
export const filterCategoryThunk = id => {
   return (dispatch) => {
        dispatch (setIsLoading(true))
        return axios
        .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${id}`)
        .then((res) => dispatch(setProducts(res.data.data.products)))
         .finally(() => dispatch(setIsLoading(false)))
    }
}

export const filterHeadLineThunk = (headLine) => {
    return (dispatch) => {
        dispatch (setIsLoading(true))
        return axios
        .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${headLine}`)
        .then((res) => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)))
    }
}

export const loginThunk = credentials => {
    return (dispatch) => {
        dispatch (setIsLoading(true))
        return axios
        .post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login/", credentials)
        .finally(() => dispatch(setIsLoading(false)))
    }
}

export const addPurchasesThunk = products => {
    return (dispatch) => {
        dispatch(setIsLoading(true))
        return axios
        .post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", products, getConfig())
        .finally(() => dispatch(setIsLoading(false)))
    }
}


export const getPurchasesThunk = () =>{
    return (dispatch) => {
        dispatch(setIsLoading(true))
        return axios
        .get('https://ecommerce-api-react.herokuapp.com/api/v1/?purchases', getConfig()) 
        .then(res => console.log(res.data.data.products))
        .catch(error =>{
            if(error?.response?.status === 404)
            console.log("El carrito está vacío")
            })
         .finally(() => dispatch(setIsLoading(false)))
    }
}
