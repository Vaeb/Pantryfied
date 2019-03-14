/**
 * Get nutritional information about recipes psuedo code
 */

// JavScript psuedo code
// Recipes show the total nutritional information of ingredients used


fat: undefined
carbohydrates: undefined
protein: undefined
sugar: undefined
salt: undefined

getRecipes() {
    foodName = text input 
    apiCall = fetch('APIName{foodName}')
    data = apiCall.JSON
    IF foodName is TRUE then 
        fat: data.fat
        carbohydrates: data.carbohydrates
        protein: data.protein
        sugar: data.sugar
        salt: data.salt
}