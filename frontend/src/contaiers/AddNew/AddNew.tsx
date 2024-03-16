import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import InputBtn from '../../components/InputBtn/InputBtn';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {getAllPhoto, PostPhoto} from '../../store/GalleryThunks';
import {selectUser} from '../../features/user/userSlice';

const AddNew = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(selectUser)!;
	const [state, setState] = useState({
		title: "",
		image: null,
	});

	const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		setState((prevState: any) => ({...prevState, [name]: value}));
	};

	const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, files} = e.target;
		setState((prevState) => ({
			...prevState,
			[name]: files && files[0] ? files[0] : null,
		}));
	};

	const submitFormHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await dispatch(PostPhoto({
				user: user?._id,
				title: state.title,
				author: user?.displayName,
				image: state.image!,
			}));
			await dispatch(getAllPhoto());
			navigate("/");
		} catch (e) {
			// error happened
		}
	};

	return (
		<div >
			<form onSubmit={submitFormHandler}>
				<TextField id="outlined-basic" label="Title" variant="outlined"
				           name="title"
				           autoComplete="title"
				           required
				           value={state.title}
				           onChange={inputChangeHandler}/>

				<InputBtn onChange={fileInputChangeHandler} name='image' label='Image'/>
				<Button size="small"  type='submit'>Sande</Button>
			</form>
		</div>
	);
};

export default AddNew;