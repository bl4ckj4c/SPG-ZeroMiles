import {  Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';


function UserDropdown(props) {
    const filterByFields = ['Name', 'Surname'];
    let privacy;
    if (props.privacy)
        privacy = true;
        else
        privacy = false;
    return (
        <>
            <Form.Group>
                <Typeahead
                    filterBy={filterByFields}
                    id="basic-typeahead-single"
                    labelKey={(option) => `${option.Name} ${option.Surname}`}
                    onChange={props.setSelectedUser}
                    options={props.users}
                    placeholder="👤 Choose a customer..."
                    selected={props.selectedUser}
                    renderMenuItemChildren={(option) => (
                        <div>
                            {option.Name + " " + option.Surname}
                            {privacy ? "" : 
                            <div>
                                <small>{option.Address + " - " + option.City + ", " + option.State + " " + option.Zipcode} </small>
                            </div>
                    }
                        </div>
                    )}
                />
            </Form.Group>
        </>
    );
};

export default UserDropdown;