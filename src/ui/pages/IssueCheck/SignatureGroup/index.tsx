import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Menu from 'ui/components/Menu';
import Title from 'ui/components/Title';
import BoxAdapter from 'ui/htsc-components/BoxAdapter';
import ButtonAdapter from 'ui/htsc-components/ButtonAdapter';
import Stepper from 'ui/htsc-components/Stepper';

import { menuList } from '../../HomePage/menuList';
import {
	DragDropContext,
	Droppable,
	OnDragEndResponder,
	DropResult,
	Draggable
  } from 'react-beautiful-dnd';





import { useState } from 'react';

export type Item = {
	id: string;
	text: string;

  };

  
export type DraggableListProps = {
	items: Item[];
	onDragEnd: OnDragEndResponder;
  };


  const reorder = <T,>(
	list: T[],
	startIndex: number,
	endIndex: number
  ): T[] => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
  
	return result;
  };

export default function SignatureGroup() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));


	const [items, setItems] = useState([
		{ id: '1', text: 'Item 1' },
		{ id: '2', text: 'Item 2' },
		{ id: '3', text: 'Item 3' },
		{ id: '4', text: 'Item 4' },
	  ]);

	const onDragEnd = ({ destination, source }: DropResult) => {
	  // dropped outside the list
	  if (!destination) return;
  
	  const newItems = reorder(items, source.index, destination.index);
  
	  setItems(newItems);
	};

	  

	return (
		<Grid
			container
			sx={{ padding: matches ? '0' : '64px 0' }}
			justifyContent={'center'}
			gap={'24px'}
			dir={theme.direction}
		>
			<Grid
				item
				xs={12}
				md={8}
			>
				<BoxAdapter fullWidth={matches}>
					<Grid
						minHeight={matches ? 'calc(100vh - 64px)' : 'calc(100vh - 192px)'}
						container
						direction={'column'}
						justifyContent={'space-between'}
						wrap="nowrap"
					>
						<Grid>
							<Title>{t('activationElCheck')}</Title>
							{!matches ? (
								<Stepper
									list={[
										t('selectCheck'),
										t('checkInfo'),
										t('recivers'),
										t('issueSignature'),
										t('selectSignatureGroup'),
										t('end')
									]}
									active={4}
								/>
							) : null}
							<Typography
								variant="body1"
								sx={{ marginBottom: '16px' }}
							>
								{t('signatureGroupText')}
							</Typography>
							<Grid
								container
								spacing={'24px'}
								direction={'row'}
							>
<DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
 {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          
        >
          <ListItemAvatar>
            <Avatar>
            
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.text} secondary={item.text} />
        </ListItem>
      )}
			  </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

							</Grid>
						</Grid>

						<Grid container>
							<ButtonAdapter
								variant="contained"
								size="medium"
								muiButtonProps={{ sx: { width: '100%' } }}
								forwardIcon
								onClick={() => console.log()}
							>
								{t('continue')}
							</ButtonAdapter>
						</Grid>
					</Grid>
				</BoxAdapter>
			</Grid>

			{matches ? null : (
				<Grid
					item
					md={3}
					dir={theme.direction}
				>
					<BoxAdapter>
						<Menu list={menuList} />
					</BoxAdapter>
				</Grid>
			)}
		</Grid>
	);
}










