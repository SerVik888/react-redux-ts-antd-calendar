import { Button, DatePicker, Form, Input, Row, Select } from 'antd'
import { Moment } from 'moment'
import { FC, useState } from 'react'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { IEvent } from '../models/IEvent'
import { IUser } from '../models/IUser'
import { formatDate } from '../utils/date'
import { rules } from '../utils/rules'

interface EventFormProps {
  guests: IUser[]
  submit: (event: IEvent) => void
}

export const EventForm: FC<EventFormProps> = props => {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    guest: '',
    date: '',
    description: '',
  } as IEvent)

  const { user } = useTypeSelector(state => state.auth)

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate()) })
    }
  }

  const submitForm = () => {
    props.submit({ ...event, author: user.username })
  }

  return (
    <Form onFinish={submitForm}>
      <Form.Item label='Описание события' name='description' rules={[rules.required()]}>
        <Input value={event.description} onChange={e => setEvent({ ...event, description: e.target.value })} />
      </Form.Item>
      <Form.Item
        label='Дата создания'
        name='date'
        rules={[rules.required(), rules.isDateAfter('Не может быть создано в прошлом')]}
      >
        <DatePicker onChange={date => selectDate(date)} />
      </Form.Item>
      <Form.Item label='Имя гостя' name='guest' rules={[rules.required()]}>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map(guest => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify='end'>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}
