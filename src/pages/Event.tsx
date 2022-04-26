import { Button, Layout, Modal, Row } from 'antd'
import { FC, useEffect, useState } from 'react'
import { EventCalendar } from '../components/EventCalendar'
import { EventForm } from '../components/EventForm'
import { useActions } from '../hooks/useActions'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { IEvent } from '../models/IEvent'

export const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { guests, events } = useTypeSelector(state => state.events)
  const { user } = useTypeSelector(state => state.auth)
  const { fetchGuests, createEvent, fetchEvents } = useActions()

  useEffect(() => {
    fetchGuests()
    fetchEvents(user.username)
  }, [])

  const addNewEvent = (event: IEvent) => {
    setModalVisible(false)
    createEvent(event)
  }

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify='center'>
        <Button onClick={() => setModalVisible(true)}>Создать событие</Button>
      </Row>
      <Modal title='Создать событие' visible={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  )
}
