
import { Button, Card, Col, Divider, Dropdown, Input, Layout, Row, Space } from 'antd'
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { ChangeEventHandler, useState, useEffect } from 'react';

const { Content, Footer, Header } = Layout

export default function Home() {

  const [note, setNote] = useState<string>('')
  const [notes, setNotes] = useState<any[]>([])
  const [seconds, setSeconds] = useState<number>(10)

  useEffect(() => {
    getNotes()
    getTimer()
    // Set up the interval
    const interval = setInterval(getNotes, 5000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTimer = async () => {
    const { data } = await axios.get(`http://localhost:3001/note/gettimer`)
    setSeconds(data)
  }

  const increase = async () => {
    const { data } = await axios.post(`http://localhost:3001/note/increasetimer`)
    await getTimer()
  }

  const decrease = async () => {
    const { data } = await axios.post(`http://localhost:3001/note/decreasetimer`)
    await getTimer()
  }

  const getNotes = async () => {
    const { data } = await axios.get(`http://localhost:3001/note/all`)
    setNotes([...data])
  }

  const addNote = async (time: number = 0) => {
    const { data } = await axios.post('http://localhost:3001/note/addnote', { note, time })
    setNote('')
    await getNotes()
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">

        <Row justify={'center'} style={{ marginTop: '16px' }}>
          <Col style={{ width: '80%' }}>
            <Input.Group compact>
              <Input
                style={{ width: 'calc(100% - 300px)' }}
                placeholder={'WHAT ARE YOU THINKING RIGHT NOW ?'}
                onChange={(e: any) => setNote(e.target.value)} />
              <Button.Group>
                <Button onClick={() => addNote()}>Save note</Button>
                <Button onClick={() => addNote(seconds)}>{`Save for ${seconds}s`}</Button>
                <Button onClick={increase}>Increase</Button>
                <Button onClick={decrease}>Decrease</Button>
              </Button.Group>
            </Input.Group>
          </Col>
        </Row>

        <Divider />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {notes.map((note, idx) => <Col key={idx} style={{ margin: '16px' }}>
            <Card title={note.key} bordered={false} style={{ width: 300 }} extra={<>
              <Button type={'text'}>Delete</Button>
            </>}>
              <p>{note.value}</p>
            </Card>
          </Col>)}
        </div>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
