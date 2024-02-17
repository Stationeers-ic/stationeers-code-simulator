import React, {useCallback, useRef, useState} from 'react';
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

    const clear = () => {
        setCode('')
        setErrors('')
        setEnv('{}')
    }


    const onChangeCode = useCallback((val: React.SetStateAction<string>) => {
        setCode(val);
    }, []);
    const onChangeEnv = useCallback((val: React.SetStateAction<string>) => {
        setEnv(val);
    }, []);
    let err: Err[] = []
    const run = async () => {
        err = [];
        setErrors(JSON.stringify(err, null, 2));
        console.time("Run");
        console.debug("Run");
        const mem = new DevEnv()
        mem.data = JSON.parse(env);
        mem.on("error", (e) => {
            err.push(e);
            setErrors(JSON.stringify(err, null, 2));
        });
        mem.afterLineRun = async (line) => {
            const editor = codeMirrorRef?.current?.editor;
            await delay(50);
            if (editor) {
                const currentLine = editor.querySelector(`.cm-content .cm-line:nth-child(${line.lineIndex +1})`);
                currentLine?.setAttribute('data-selected','true');
            }
            await delay(200);
            setEnv(JSON.stringify(mem.data, null, 2));
        };
        const ic = new InterpreterIc10(mem, code);
        await ic.run();


        console.debug("end");
        console.timeEnd("Run");
        setEnv(JSON.stringify(mem.data, null, 2));
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