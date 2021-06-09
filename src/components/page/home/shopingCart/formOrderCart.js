import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import shoppingCartStyle from './shoppingCartStyle.js';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldCustom from '../../../fromControl/TextFiled';
import { useForm } from 'react-hook-form';


function FormOrderCart(props) {
    const {classes, customer} = props
  const schema = yup.object().shape({
    nameOrder: yup.string().required('Vui lòng nhập trường này!'),
    phoneOrder: yup.string().min(10, 'Tối thiểu 10 kí tự').required('Vui lòng nhập trường này!'),
    addressOrder: yup.string().required('Vui lòng nhập trường này!'),
  });
  console.log()
  const defaultValues = {
    nameOrder: customer.name || '',
    phoneOrder: customer.phone || '',
    addressOrder: customer.address || '',
  };

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data) => {
      const {handleSubmitForm} = props
    if (handleSubmitForm) {
        await handleSubmitForm(data)
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmitForm)}>
      <div className={classes.asideWrapper}>
        <h3 className={classes.asideTitle}>Thông tin nhận hàng</h3>
        <div className={classes.asideCheckoutInfo}>
          <TextFieldCustom
            label="Tên nhận hàng"
            form={form}
            name="nameOrder"
            className={classes.inputFiled}
            defaultValues={customer.name}
          />
        </div>
        <div className={classes.asideCheckoutInfo}>
          <TextFieldCustom
            label="Số điện thoại"
            form={form}
            name="phoneOrder"
            className={classes.inputFiled}
          />
        </div>
        <div className={classes.asideCheckoutInfo}>
          <TextFieldCustom
            label="Địa chỉ"
            form={form}
            name="addressOrder"
            className={classes.inputFiled}
          />
        </div>
        {/* <div className={classes.asideCheckoutInfo}>
            <Controller
            render={({ onChange, value }) => (
                <TextField onChange={onChange} label="chu" fullWidth value={value} />
            )}
            name="TextField"
            control={form.control}
            rules={{ required: true }}
            />
        </div> */}

        <Button
          className={classes.buttonCart}
          variant="contained"
          color="secondary"
          // onClick={() => handleSubmitForm("tuan")}
          type="submit"
        >
          Đặt hàng
        </Button>
      </div>
    </form>
  );
}

FormOrderCart.propTypes = {};

export default FormOrderCart;
