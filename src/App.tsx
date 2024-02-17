import React, {useCallback} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {Button, Col, Container, Row} from "react-bootstrap";
import {json} from '@codemirror/lang-json';
import {monokai} from '@uiw/codemirror-theme-monokai';
import {InterpreterIc10} from "ic10";
import {DevEnv} from "ic10/dist/DevEnv";
import {Err} from "ic10/dist/abstract/Err";

function App() {
    const [code, setCode] = React.useState("");
    const [errors, setErrors] = React.useState("");
    const [env, setEnv] = React.useState("{}");
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
                    <Button onClick={run}>Run</Button>
                </Col>
            </Row>
            <Row>
                <Col><CodeMirror theme={monokai} value={code} height="500px" onChange={onChangeCode}/></Col>
                <Col><CodeMirror theme={monokai} value={env} height="500px" extensions={[json()]} onChange={onChangeEnv}/></Col>
            </Row>
            <hr></hr>
            <Row>
                <Col><CodeMirror theme={monokai} value={errors} extensions={[json()]} height="200px"/></Col>
            </Row>
        </Container>
    );
}

export default App;