import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

export default function Front() {
    const [userInput, setUserInput] = useState('');
    const [list, setList] = useState([]);

    const getFontSize = () => {
        const width = window.innerWidth;
        if (width <= 280) return '20px';
        if (width <= 480) return '30px';
        if (width <= 768) return '40px';
        if (width <= 100) return '60px';

        return '80px';
    }

    const [fontSize, setFontSize] = useState(getFontSize());

    useEffect(() => {
        const handleResize = () => {
            setFontSize(getFontSize());
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);


    const style = {
        fontSize,
        fontWeight: 'bold',
        color: 'rgb(91,89,89)',
        display: 'flex',
        justifyContent: 'center'
    }


    // funcion to update userinput values
    const updateInput = (value) => {
        setUserInput(value);
    }

    // Function to add items
    const addItem = (e) => {
        e.preventDefault();
        if (userInput !== '') {
            const newItem = {
                id: Math.random(),
                value: userInput,
            }
            setList([...list, newItem]);
            setUserInput('');
        }
    }

    // function to delete item from list using id
    const deleteItem = (key) => {
        const updatedList = list.filter((item) => item.id !== key);
        setList(updatedList);
    }

    // edit list
    const editItem = (index) => {
        const editedTodo = prompt('Edit the Todo :');
        if (editedTodo !== null && editedTodo.length !== '') {
            const updatedList = [...list];
            updatedList[index].value = editedTodo;
            setList(updatedList);
        }
    }

    return (
        <Container>
            <Row style={style}>
                TO-Do List
            </Row>
            <hr />
            <Row>
                <Col md={{ span: 5, offset: 3 }}>
                    <form onSubmit={addItem}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="add item..."
                                size='lg'
                                onChange={(e) => updateInput(e.target.value)}
                                value={userInput}
                            />
                            <Button variant="dark" className="ml-2" type="submit">Add</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 5, offset: 3 }}>
                    <ListGroup>
                        {list.map((item, index) => {
                            return (
                                <div key={index}>
                                    <ListGroup.Item variant="dark" action style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {item.value}
                                        <span>
                                            <Button variant="light" style={{ marginRight: '10px' }} onClick={() => deleteItem(item.id)}>
                                                Delete
                                            </Button>
                                            <Button style={{ marginRight: '20px' }} variant="light" onClick={() => editItem(index)}>
                                                Edit
                                            </Button>
                                        </span>
                                    </ListGroup.Item>

                                </div>
                            )
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}
