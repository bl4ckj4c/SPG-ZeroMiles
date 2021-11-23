import {Col, Form, ListGroup} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";

function Sidebar(props) {

    const allActive = props.orderStatusSelected === 'all' ? 'active' : '';
    const openActive = props.orderStatusSelected === 'open' ? 'active' : '';
    const pendingActive = props.orderStatusSelected === 'pending' ? 'active' : '';
    const closedActive = props.orderStatusSelected === 'closed' ? 'active' : '';
    const clientsActive = props.orderStatusSelected === 'clients' ? 'active' : '';
    let classStr;

    if(props.collapsed)
        classStr = 'sfondosidebar collapse d-sm-block col col-3 below-nav';
    else
        classStr = 'sfondosidebar d-sm-block col col-3 below-nav';

    return (
        <Col
            className={classStr}
            id="left-sidebar"
            style={{minHeight: '100vh'}}
            sticky='left'>
            <ListGroup variant="flush">
                <Form.Group>
                    <Typeahead
                        className='my-2 ml-2'
                        id="basic-typeahead-single"
                        labelKey={(option) => `${option}`}
                        options={props.ordersList
                            .map(item => [item.Name, item.Surname].join(" "))
                            .filter((item, index, self) => self.indexOf(item) === index)}
                        placeholder="Search by client"
                        onChange={selected => {
                            if (selected.length > 0)
                                props.setOrderClientSelected(selected[0]);
                            else
                                props.setOrderClientSelected('');
                        }}
                    />
                </Form.Group>
                <ListGroup.Item className='border-0'>
                    <div style={{fontSize: 20}}><b>Orders</b></div>
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 ' + allActive} action
                                onClick={() => props.setOrderStatusSelected('all')}>
                    All
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 ' + openActive} action
                                onClick={() => props.setOrderStatusSelected('open')}>
                    Open
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 ' + pendingActive} action
                                onClick={() => props.setOrderStatusSelected('pending')}>
                    Pending
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 ' + closedActive} action
                                onClick={() => props.setOrderStatusSelected('closed')}>
                    Closed
                </ListGroup.Item>
                <ListGroup.Item className='border-0 mt-2 '>
                    <div style={{fontSize: 20}}><b>Clients</b></div>
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 ' + clientsActive} action
                                onClick={() => props.setOrderStatusSelected('clients')}>
                    <div>All</div>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    );
}

export default Sidebar;