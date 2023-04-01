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
		return <CardPhoto user_id={element.user} key={element._id} currentId={element._id} author={element.author} title={element.title} image={element.image}/>
	});

	return <div>
		{ arrayWithPhoto.length !== 0 ? createCard : <h2>Sorry no photo !</h2>}
	</div>;
};

export default Main;
