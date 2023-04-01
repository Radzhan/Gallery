import React from 'react';
import {apiURL} from '../../constants';
import {Box, Button, Card, CardActions, CardMedia, Modal} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../../features/user/userSlice';
import {DeleteOne, getAllPhoto} from '../../store/GalleryThunks';
import {useNavigate} from 'react-router-dom';

interface Props {
	author: string;
	title: string;
	image: string;
	id: string;
}

const CardPhoto: React.FC<Props> = ({id, author, title, image}) => {
	const cardImage = apiURL + '/' + image;
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

	const deleteOne = async (id: string) => {
		await dispatch(DeleteOne(id))
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
				<Button size="small" onClick={() => navigate('/author/' + id)}>{author}</Button>
				{user?.role === 'admin' ?
					<Button size="small" onClick={() => deleteOne(id)}>Delete</Button> : null
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