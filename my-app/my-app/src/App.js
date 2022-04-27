import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Card,
	CardBody,
	CardTitle,
	FormGroup,
	Label,
	Input,
	Button,
	Container,
	Row,
	Col
} from 'reactstrap';

import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const App = () => {

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [cpf, setCpf] = useState('');
	const [rg, setRg] = useState('');
	const [date, setDate] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [street, setStreet] = useState('');
	const [number, setNumber] = useState('');
	const [complement, setComplement] = useState('');
	const [neighborhood, setNeighborhood] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');

	const getDataLocalStorage = () => {
		const data = JSON.parse(localStorage.getItem("myData"));
		if (data) {
			setName(data.name);
			setPhone(data.phone);
			setCpf(data.cpf);
			setRg(data.rg);
			setDate(data.date);
			setZipCode(data.address.cep);
			setStreet(data.address.street);
			setNumber(data.address.number);
			setComplement(data.address.complement);
			setNeighborhood(data.address.neighborhood);
			setCity(data.address.city);
			setState(data.address.state);
		}
	}

	const clearDataLocalStorage = () => {
		localStorage.removeItem("myData");
	}

	const saveData = () => {
		let data = {
			'name'  : name,
			'phone' : phone,
			'cpf'	: cpf,
			'rg'	: rg,
			'date'	: date,
			'address' : {
				'street'       : street,
				'number'       : number,
				'complement'   : complement,
				'neighborhood' : neighborhood,
				'city'		   : city,
				'state'		   : state,
				'cep'		   : zipCode
			},
		};

		localStorage.setItem("myData", JSON.stringify(data));

		toast.success('Dados armazenados com sucesso!', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}

	const clearData = () => {
		setName('');
		setPhone('');
		setCpf('');
		setRg('');
		setDate('');
		setZipCode('');
		setStreet('');
		setNumber('');
		setComplement('');
		setNeighborhood('');
		setCity('');
		setState('');

		clearDataLocalStorage();
	}

	const changeZipCode = (e) => {
		setZipCode(e.target.value);

		if (e.target.value.length >= 8) {
			let code = e.target.value.replace('-', '');
			axios.get(
				`https://viacep.com.br/ws/${code}/json/`
			).then((response) =>  {
				if (response.status === 200) {
					setZipCode(code);
					setStreet(response.data.logradouro);
					setNeighborhood(response.data.bairro);
					setCity(response.data.localidade);
					setState(response.data.uf);
				}
			});
		}
	}

	useEffect(() => {
		getDataLocalStorage();
	}, []);
	
	return (
		<div className="App">
			<ToastContainer />

			<Container>
				<Card>
					<CardBody>
						<CardTitle tag="h5">
							Formulário de Cadastro
						</CardTitle>
					</CardBody>
				</Card>

				<Row xs="12">
					<Col lg="12">
						<FormGroup>
							<Label for="name">
								Nome
							</Label>
							<Input
								id="name"
								name="name"
								placeholder="Nome"							
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
						</FormGroup>	
					</Col>

					<Col lg="3">
						<FormGroup>
							<Label for="phone">
								Telefone
							</Label>
							<InputMask
								id="phone"
								name="phone"
								placeholder="(XX) XXXXX-XXXX"
								mask="(99) 99999-9999"
								className="form-control"
								onChange={(e) => setPhone(e.target.value)}
								value={phone}
							/>
							{/* <Input
								id="phone"
								name="phone"
								placeholder="(XX) XXXXX-XXXX"		
								onChange={(e) => setPhone(e.target.value)}
								value={phone}
							/> */}
						</FormGroup>	
					</Col>					
				
					<Col lg="3">
						<FormGroup>
							<Label for="cpf">
								CPF
							</Label>
							<InputMask
								id="cpf"
								name="cpf"
								placeholder="999.999.999-99"
								mask="999.999.999-99"
								className="form-control"
								onChange={(e) => setCpf(e.target.value)}
								value={cpf}
							/>
							{/* <Input
								id="cpf"
								name="cpf"
								placeholder="CPF"							
								onChange={(e) => setCpf(e.target.value)}
								value={cpf}
							/> */}
						</FormGroup>	
					</Col>

					<Col lg="3">
						<FormGroup>
							<Label for="rg">
								RG
							</Label>
							<Input
								id="rg"
								name="rg"
								placeholder="RG"							
								onChange={(e) => setRg(e.target.value)}
								value={rg}
							/>
						</FormGroup>	
					</Col>

					<Col lg="3">
						<FormGroup>
							<Label for="date">
								Data de Nascimento
							</Label>
							<InputMask
								id="date"
								name="date"
								placeholder="99/99/9999"
								mask="99/99/9999"
								className="form-control"
								onChange={(e) => setDate(e.target.value)}
								value={date}
							/>
							{/* <Input
								id="date"
								name="date"
								placeholder="Data de Nascimento"							
								onChange={(e) => setDate(e.target.value)}
								value={date}
							/> */}
						</FormGroup>	
					</Col>

					<Col lg="2">
						<FormGroup>
							<Label for="cep">
								CEP
							</Label>
							<InputMask
								id="cep"
								name="cep"
								placeholder="99999-999"
								mask="99999-999"
								className='form-control'
								onChange={changeZipCode}
								value={zipCode}
							/>
							{/* <Input
								id="cep"
								name="cep"
								placeholder="99999-999"
								onChange={changeZipCode}
								value={zipCode}
							/> */}
						</FormGroup>	
					</Col>

					<Col lg="4">
						<FormGroup>
							<Label for="street">
								Endereço
							</Label>
							<Input
								id="street"
								name="street"
								placeholder='Endereço'
								readOnly={true}
								value={street}
							/>
						</FormGroup>
					</Col>

					<Col lg="2">
						<FormGroup>
							<Label for="number">
								Número
							</Label>
							<Input
								id="number"
								name="number"
								placeholder='Número'
								onChange={(e) => setNumber(e.target.value)}
								value={number}
							/>
						</FormGroup>
					</Col>

					<Col lg="2">
						<FormGroup>
							<Label for="complement">
								Complemento
							</Label>
							<Input
								id="complement"
								name="complement"
								placeholder='Complemento'
								onChange={(e) => setComplement(e.target.value)}
								value={complement}
							/>
						</FormGroup>
					</Col>

					<Col lg="2">
						<FormGroup>
							<Label for="neighborhood">
								Bairro
							</Label>
							<Input
								id="neighborhood"
								name="neighborhood"
								placeholder='Bairro'
								readOnly={true}
								value={neighborhood}
							/>
						</FormGroup>
					</Col>

					<Col lg="2">
						<FormGroup>
							<Label for="city">
								Cidade
							</Label>
							<Input
								id="city"
								name="city"
								placeholder='Cidade'
								readOnly={true}
								value={city}
							/>
						</FormGroup>
					</Col>

					<Col lg="2">
						<FormGroup>
							<Label for="state">
								Estado
							</Label>
							<Input
								id="state"
								name="state"
								placeholder='Estado'
								readOnly={true}
								value={state}
							/>
						</FormGroup>	
					</Col>
				
				</Row>

				<Row xs="12">
					<Col lg="6">
						<Row xs="6">
							<Col lg="2">
								<Button color='success' onClick={saveData}>
									Salvar
								</Button>
							</Col>
							<Col lg="2">
								<Button color='danger' onClick={clearData}>
									Limpar
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>

		</div>
	);
}

export default App;