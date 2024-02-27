import React, {useCallback, useEffect, useRef, useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import {json} from '@codemirror/lang-json';
import {monokai} from '@uiw/codemirror-theme-monokai';
import {InterpreterIc10} from "ic10";
import {DevEnv} from "ic10/dist/DevEnv";
import {Err} from "ic10/dist/abstract/Err";
import {ReactCodeMirrorRef} from "@uiw/react-codemirror/src";
import './App.css'

async function delay(number: number) {
    return new Promise(resolve => setTimeout(resolve, number));
}

function App() {
    const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState("");
    const [env, setEnv] = useState("{}");
    const [line, setLine] = useState(0);

    const clear = () => {
        setCode('')
        setErrors('')
        setEnv('{}')
        setLine(0)
    }

    useEffect(() => {
        const editor = codeMirrorRef?.current?.editor;
        if (editor) {
            const currentLine = editor.querySelector(`.cm-content .cm-line:nth-child(${line + 1})`);
            currentLine?.setAttribute('data-selected', 'true');
        }
    }, [line]);

    const onChangeCode = useCallback((val: React.SetStateAction<string>) => {
        setCode(val);
    }, []);
    const onChangeEnv = useCallback((val: React.SetStateAction<string>) => {
        setEnv(val);
    }, []);
    let err: Err[] = []

    const addError = (string: string) => {
        setErrors(errors + string + "\n")
    }
    
    const run = async () => {
        addError(JSON.stringify(err, null, 2));
        console.time("Run");
        console.debug("Run");
        const mem = new DevEnv()
        mem.data = JSON.parse(env);
        mem.on("error", (e) => {
            addError(e.format());
        });
        mem.afterLineRun = async (line) => {
            await delay(200);
            setLine(line.lineIndex);
            setEnv(JSON.stringify(mem.data, null, 2));
        };
        const ic = new InterpreterIc10(mem, code);
        await ic.run();
        console.debug("end");
        console.timeEnd("Run");
        setEnv(JSON.stringify(mem.data, null, 2));
    }

    const step = async () => {
        const mem = new DevEnv()
        mem.data = JSON.parse(env);
        mem.line = line;
        mem.on("error", (e) => {
            addError(e.format());
        })
        mem.afterLineRun = async (line) => {
            setLine(line.lineIndex + 1);
            setEnv(JSON.stringify(mem.data, null, 2));
        };
        const ic = new InterpreterIc10(mem, code);
        const answer = await ic.step()
        if (answer == false) {
            setLine(mem.line);
        }
        if (typeof answer == 'string') {
            addError(answer)
        }
    }

    return (
        <Container>
            <Row>
                <Col><h1>Code</h1></Col>
                <Col><h1>Environment</h1></Col>
            </Row>
            <Row>
                <Col>
                    <ButtonGroup>
                        <Button variant={'success'} onClick={run}>Run</Button>
                        <Button variant={'danger'} onClick={clear}>Clear</Button>
                        <Button variant={'info'} onClick={step}>Step</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col><CodeMirror ref={codeMirrorRef} theme={monokai} value={code} height="500px" onChange={onChangeCode}/></Col>
                <Col><CodeMirror theme={monokai} value={env} height="500px" extensions={[json()]} onChange={onChangeEnv}/></Col>
            </Row>
            <hr></hr>
            <Row>
                <Col><CodeMirror editable={false} theme={monokai} value={errors} extensions={[json()]} height="200px"/></Col>
            </Row>
        </Container>
    );
}

export default App;