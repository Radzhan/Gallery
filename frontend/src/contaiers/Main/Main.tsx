import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {AllPhoto} from '../../store/GallerySlice';
import {getAllPhoto} from '../../store/GalleryThunks';
import CardPhoto from '../../components/CardPhoto/CardPhoto';

const Main = () => {
	const arrayWithPhoto = useAppSelector(AllPhoto);
	const dispatch = useAppDispatch();

	const requestArtist = useCallback(async () => {
		await dispatch(getAllPhoto());
	}, [dispatch]);

	useEffect(() => {
		requestArtist().catch(console.error);
	}, [requestArtist]);

	const createCard = arrayWithPhoto.map((element) => {
		return <CardPhoto key={element._id} id={element._id} author={element.author} title={element.title} image={element.image}/>
	});

	return <div>{createCard}</div>;
};

export default Main;
