import axios from "axios"
import { Button, Form, Modal } from "react-bootstrap"
import { useState } from "react"

async function sendFeedBack(data: { message: string; contact: string; code: string; env: string; errors: string }) {
	const form = new FormData()
	form.append("message", data.message)
	form.append("contact", data.contact)
	form.append("code", data.code)
	form.append("env", data.env)
	form.append("errors", data.errors)

	const options = {
		method: "POST",
		url: "https://n8n.traineratwot.site/webhook/b2f66dcc-a2a7-4ed1-9b2d-0261de8ca648",
		headers: { "Content-Type": "multipart/form-data; boundary=---011000010111000001101001" },
		data: form,
	}

	return axios.request(options)
}

const FeedBack = (props: { code: string; env: string; errors: string }) => {
	const [show, setShow] = useState(false)
	const [contact, setContact] = useState("")
	const [message, setMessage] = useState("")

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const send = () => {
		sendFeedBack({
			message,
			contact,
			code: props.code,
			env: props.env,
			errors: props.errors,
		}).then(() => handleClose())
	}

	return (
		<>
			<Button variant='warning' onClick={handleShow}>
				send bug report
			</Button>

			<Modal show={show} onHide={handleClose} centered size={"lg"}>
				<Modal.Header closeButton>
					<Modal.Title>Bug report</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Contact</Form.Label>
							<Form.Control
								value={contact}
								onChange={(e) => setContact(e.target.value)}
								type='text'
								placeholder='You name or mail or discord tag :)'
								autoFocus
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Message</Form.Label>
							<Form.Control
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								as='textarea'
								rows={3}
								placeholder={"What`s wrong?"}
							/>
						</Form.Group>
						<p>Code, environment and errors will be sent automatically</p>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={send}>
						send
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default FeedBack
