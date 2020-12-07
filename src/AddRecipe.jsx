import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function AddRecipe() {
  const [recipe, setRecipe] = useState({
    title: "",
    cuisine: "",
    dishType: "",
  });

  const [ingredients, setIngredients] = useState([""]);
  // function handleTitleChange(event) {
  //   setRecipe({ ...recipe, title: event.target.value});
  // }

  // function handleCuisineChange(event) {
  //   setRecipe({...recipe, cuisine: event.target.value });
  // }

  // function handleDishtype(event) {
  //   setRecipe({...recipe, dishType: event.target.value });
  // }

  function handleChange(event) {
    setRecipe({
      ...recipe,
      [event.target.name]: event.target.value,
    });
  }

  function handleIngredientsChange(value, index) {
    let ingredientsCopy = [...ingredients];
    ingredientsCopy[index] = value;
    setIngredients(ingredientsCopy);
  }

  function addIngredient() {
    setIngredients([...ingredients, ""]);
  }

  function removeIngredient(index) {
    let ingredientsCopy = [...ingredients];
    ingredientsCopy.splice(index, 1);
    setIngredients(ingredientsCopy);
  }

  function addRecipe(event) {
    event.preventDefault();

    var config = {
      method: 'post',
      url: 'http://localhost:3000/recipes',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem("token")}`, 
        'Content-Type': 'application/json'
      },
      data :  { ...recipe, ingredients }
    };
    
    axios(config)
      .then((response) => {
        debugger;
      })
      .catch((error) => {
        debugger;
      });
  }

  return (
    <div className="container-fluid jumbotron vertical-center vh-100">
      <div className="row">
        <div className="col-6 offset-3">
          <form onSubmit={addRecipe}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="title"
                value={recipe.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cuisine">Cuisine</label>
              <input
                type="text"
                className="form-control"
                name="cuisine"
                placeholder="cuisine"
                value={recipe.cuisine}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dishType">Dish type</label>
              <input
                type="text"
                className="form-control"
                name="dishType"
                placeholder="dishtype"
                value={recipe.dishType}
                onChange={handleChange}
              />
            </div>

            {ingredients.map((ingredient, index) => (
              <div className="form-group">
                <label htmlFor="ingredient">Ingredient</label>
                <input
                  type="text"
                  className="form-control"
                  name="ingredient"
                  placeholder="ingredient"
                  value={ingredients[index]}
                  onChange={(e) =>
                    handleIngredientsChange(e.target.value, index)
                  }
                />
                <div className="d-flex justify-content-between pt-3">
                  <button className="btn btn-primary" onClick={addIngredient}>
                    +
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => removeIngredient(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}

            {ingredients.length == 0 && (
              <div className="d-flex justify-content-between pt-3">
                <button className="btn btn-primary" onClick={addIngredient}>
                  +
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => removeIngredient(0)}
                >
                  -
                </button>
              </div>
            )}

            <button className="btn btn-primary" type="submit">
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRecipe;
