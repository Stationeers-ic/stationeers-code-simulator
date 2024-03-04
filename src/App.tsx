import React, { useCallback, useEffect, useRef, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap"
import { json } from "@codemirror/lang-json"
import { monokai } from "@uiw/codemirror-theme-monokai"
import { InterpreterIc10 } from "ic10"
import { DevEnv } from "ic10/dist/DevEnv"
import { Err } from "ic10/dist/abstract/Err"
import { ReactCodeMirrorRef } from "@uiw/react-codemirror/src"
import "./App.css"
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup"
import FeedBack from "./FeedBack.tsx"

async function delay(number: number) {
	return new Promise((resolve) => setTimeout(resolve, number))
}

let mem = new DevEnv()
let ic = new InterpreterIc10(mem, "")

function App() {
	const codeMirrorRef = useRef<ReactCodeMirrorRef>(null)
	const [code, setCode] = useState("")
	const [errors, setErrors] = useState("")
	const [env, setEnv] = useState("{}")
	const [line, setLine] = useState(0)
	ic.setCode(code)
	const clear = () => {
		setCode("")
		reset()
	}

	const reset = () => {
		setErrors("")
		setEnv("{}")
		setLine(0)
	}

	useEffect(() => {
		const editor = codeMirrorRef?.current?.editor
		if (editor) {
			const currentLine = editor.querySelector(`.cm-content .cm-line:nth-child(${line})`)
			currentLine?.setAttribute("data-selected", "true")
		}
	}, [line])

	ic.setCode(code)
	useEffect(() => {
		ic.setCode(code)
	}, [code])

	const onChangeCode = useCallback((val: React.SetStateAction<string>) => {
		setCode(val)
	}, [])

	const onChangeEnv = useCallback((val: React.SetStateAction<string>) => {
		setEnv(val)
	}, [])
	let err: Err[] = []

	const addError = (string: string) => {
		setErrors(errors + string + "\n")
	}
	const stop = () => {
		ic.stop()
	}

	const run = async () => {
		addError(JSON.stringify(err, null, 2))
		console.time("Run")
		mem.data = JSON.parse(env)
		mem.on("error", (e) => {
			addError(e.format())
		})
		mem.afterLineRun = async () => {
			await delay(200)
			setLine(mem.line)
			setEnv(JSON.stringify(mem.data, null, 2))
		}
		await ic.run()
		console.timeEnd("Run")
		setEnv(JSON.stringify(mem.data, null, 2))
	}
	const step = async () => {
		mem.data = JSON.parse(env)
		mem.line = line
		mem.on("error", (e) => {
			addError(e.format())
		})
		mem.afterLineRun = async () => {
			setEnv(JSON.stringify(mem.data, null, 2))
		}

		while ((await ic.step()) === false) {}
		setLine(mem.line)
	}
	const confirm = (event: { currentTarget: any }) => {
		confirmPopup({
			target: event.currentTarget,
			message: "Do you want to delete this record?",
			icon: "pi pi-info-circle",
			defaultFocus: "reject",
			acceptClassName: "p-button-danger",
			accept: clear,
		})
	}
	return (
		<Container>
			<Row>
				<Col>
					<h1>Code</h1>
				</Col>
				<Col>
					<h1>Environment</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<ButtonGroup>
						<Button variant={"success"} onClick={run}>
							Run
						</Button>
						<Button variant={"warning"} onClick={stop}>
							Stop
						</Button>
						<Button variant={"info"} onClick={step}>
							Step
						</Button>
						<Button variant={"warning"} onClick={reset}>
							Reset
						</Button>

						<ConfirmPopup />
						<Button variant={"danger"} onClick={confirm}>
							Clear
						</Button>
					</ButtonGroup>
				</Col>
			</Row>
			<Row>
				<Col>
					<CodeMirror
						ref={codeMirrorRef}
						theme={monokai}
						value={code}
						height='500px'
						onChange={onChangeCode}
					/>
				</Col>
				<Col>
					<CodeMirror
						theme={monokai}
						value={env}
						height='500px'
						extensions={[json()]}
						onChange={onChangeEnv}
					/>
				</Col>
			</Row>
			<hr></hr>
			<Row>
				<Col>
					<FeedBack errors={errors} env={env} code={code} />
					<CodeMirror editable={false} theme={monokai} value={errors} extensions={[json()]} height='200px' />
				</Col>
			</Row>
		</Container>
	)
}

export default App
