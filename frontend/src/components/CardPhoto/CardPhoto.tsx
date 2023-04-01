import React from 'react';
import {apiURL} from '../../constants';
import {Box, Button, Card, CardActions, CardMedia, Modal} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../../features/user/userSlice';
import {DeleteOne, getAllPhoto} from '../../store/GalleryThunks';
import {useNavigate, useParams} from 'react-router-dom';

interface Props {
	author: string;
	title: string;
	image: string;
	currentId: string;
	user_id?: string;
}

const CardPhoto: React.FC<Props> = ({currentId, author, title, image, user_id}) => {
	 let cardImage = '';

	if (image) {
		cardImage = apiURL + '/' + image;
	}
	const {id} = useParams();
	const user = useAppSelector(selectUser);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const deleteOne = async () => {
		await dispatch(DeleteOne(currentId));
		await dispatch(getAllPhoto());
	}

	return <div>
		<Card sx={{maxWidth: 345, my: 3}}>
			<CardMedia
				onClick={handleOpen}
				sx={{height: 140}}
				image={cardImage}
				title="green iguana"
			/>
			<CardActions>
				<Button onClick={handleOpen}>{title}</Button>
				{user_id ?
					<Button size="small" onClick={() => navigate('/' + author + '/' + user_id)}>{author}</Button> : null
				}
				{user?.role === 'admin' || id === user?._id ?
					<Button size="small" onClick={deleteOne}>Delete</Button> : null
				}
			</CardActions>
		</Card>
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box>
				<Button onClick={handleClose} style={{fontSize: '30px'}}>X</Button>
				<CardMedia
					sx={{height: 600, width: 600, margin: 'auto'}}
					image={cardImage}
					title="green iguana"
				/>

			</Box>
		</Modal>
	</div>;
};

export default CardPhoto;