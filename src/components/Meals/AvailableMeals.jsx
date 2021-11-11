import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();
	//* Funções dentro do useEffect devem ser sincronas, não podendo retornar promises, observables ou serem async
	//* Se quisermos usar, precisamos criar uma função dentro da nossa função do useEffect
	useEffect(() => {
		const fecthMeals = async () => {
			const response = await fetch(
				'https://react-http-cacd1-default-rtdb.firebaseio.com/meals.json',
			);

			if (!response.ok) {
				throw new Error('Something went wrong...');
			}

			const responseData = await response.json();

			const loadedMeals = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);

			setIsLoading(false);
		};

		/* try {
			fecthMeals();
		} catch (error) {
			setIsLoading(false);
			setHttpError(error.message);
		} */
		//! Tratando erro dentro de promises
		fecthMeals().catch(error => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	if (isLoading) {
		return <section className={classes.spinner}></section>;
	}

	if (httpError) {
		return (
			<section className={classes.error}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map(meal => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
