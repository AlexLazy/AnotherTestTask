import React, { FC, FormEvent, useState } from 'react';
import moment from 'moment';

import { MutationFunctionOptions } from '@apollo/react-common';
import { ExecutionResult } from 'graphql/execution';
import { Form, Input, TimePicker, Button, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
const { TextArea } = Input;

export interface TodoCardFormProps extends FormComponentProps {
  id?: string;
  title?: string;
  excerpt?: string;
  description?: string;
  time?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onEdit?(): void;
  onSave(
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined
  ): Promise<ExecutionResult<any>>;
}

const TodoCardForm: FC<TodoCardFormProps> = ({
  form,
  id,
  title,
  excerpt,
  description,
  time,
  isLoading = false,
  disabled,
  onEdit,
  onSave
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const { getFieldDecorator } = form;
  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    form.validateFields(async (err, values) => {
      setIsSaving(true);
      if (!err) {
        !!id
          ? await onSave({ variables: { ...values, id } })
          : await onSave({ variables: { ...values } });
      }
      setIsSaving(false);
      form.resetFields();
    });
  };

  return (
    <Spin
      tip={isLoading ? 'Загружаем...' : 'Сохраняем...'}
      spinning={isSaving || isLoading}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Item label='Заголовок'>
          {getFieldDecorator('title', fieldProps(title))(
            <Input disabled={disabled} />
          )}
        </Form.Item>
        <Form.Item label='Краткое описание'>
          {getFieldDecorator('excerpt', fieldProps(excerpt))(
            <Input disabled={disabled} />
          )}
        </Form.Item>
        <Form.Item label='Описание'>
          {getFieldDecorator('description', fieldProps(description))(
            <TextArea
              autosize={{ minRows: 3, maxRows: 5 }}
              disabled={disabled}
            />
          )}
        </Form.Item>
        <Form.Item label='Время на выполнение'>
          {getFieldDecorator('time', fieldProps(time, true))(
            <TimePicker
              defaultOpenValue={moment(time, format)}
              format={format}
              disabled={disabled}
            />
          )}
        </Form.Item>
        <Form.Item>
          {disabled ? (
            <Button
              type='dashed'
              onClick={e => {
                e.preventDefault();
                onEdit && onEdit();
              }}
            >
              Редактировать
            </Button>
          ) : (
            <Button type='primary' htmlType='submit' disabled={isSaving}>
              Сохранить
            </Button>
          )}
        </Form.Item>
      </Form>
    </Spin>
  );
};
export default Form.create<TodoCardFormProps>({
  name: 'todo-card'
})(TodoCardForm);

const format = 'HH:mm';

const fieldProps = (initialValue: string | undefined, isTime?: boolean) => ({
  rules: [{ required: true, message: 'Поле не должно быть пустым' }],
  initialValue: isTime
    ? moment(initialValue || '00:00', format)
    : initialValue || ''
});
