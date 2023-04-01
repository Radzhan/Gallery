import React from 'react';
import {apiURL} from '../../constants';
import {Box, Button, Card, CardActions, CardMedia, Modal} from '@mui/material';

interface Props {
	author: string;
	title: string;
	image: string;
}

const CardPhoto: React.FC<Props> = ({author, title, image}) => {
	const cardImage = apiURL + '/' + image;
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return <div>
		<Card sx={{maxWidth: 345}}>
			<CardMedia
				sx={{height: 140}}
				image={cardImage}
				title="green iguana"
			/>
			<CardActions>
				<Button onClick={handleOpen}>{title}</Button>
				<Button size="small">{author}</Button>
			</CardActions>
		</Card>
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box>
				<CardMedia
					sx={{height: 500}}
					image={cardImage}
					title="green iguana"
				/>
			</Box>
		</Modal>
	</div>;
};

export default CardPhoto;