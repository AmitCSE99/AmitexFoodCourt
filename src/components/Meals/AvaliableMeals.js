import {useEffect,useState} from 'react';
import classes from "./AvaliableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
const AvaliableMeals = () => {
  const [meals,setMeals]=useState([])
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState();
  useEffect(()=>{
    const fetchMeals=async()=>{
      const response=await fetch('https://react-http-b8047-default-rtdb.firebaseio.com/meals.json');
      
      if(!response.ok){
        throw new Error('Something went wrong');
      }


      const responseData=await response.json();
      
      const loadedMeals=[];
      for(const key in responseData){
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false)
    }

    fetchMeals().catch((error)=>{
      setIsLoading(false);
      setHttpError(error.message);
    })
  },[]);

  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading.....</p>
    </section>
  }

  if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }


  const mealItem = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealItem}</ul>
      </Card>
    </section>
  );
};
export default AvaliableMeals;
