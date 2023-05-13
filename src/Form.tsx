import { SubmitHandler, useForm } from 'react-hook-form';
import errorImg from './assets/error.png'
import { useState } from 'react';

type FormInputs = {
  radioSelection: string;
  switchState: boolean;
};

export default function Form2() {

  const [switchState, setSwitchState] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();


  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    alert(JSON.stringify({ ...data, switchState: switchState }));
    reset();
  };

  return (
    <div  >
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username

          <div className={`${errors?.username ? 'container error' : 'container'}`}>
            <input type='text'
              placeholder='Enter username'

              {...register('username', {
                required: 'Field is required',
                minLength: {
                  value: 3,
                  message: 'минимальная длина 3 символа'
                },
              })}
            />

            {errors?.username && <img className='error-img' src={errorImg} alt='error' />}
          </div>
        </label>
        <div>
          {errors?.username && <p>{errors?.username?.message as string || 'This field is required'}</p>}
        </div>

        <label>
          Password

          <div className={`${errors?.password ? 'container error' : 'container'}`}>
            <input type='password'
              placeholder='Enter password'
              {...register('password', {
                required: {
                  value: true,
                  message: 'Field is required'
                },
                minLength: {
                  value: 4,
                  message: 'минимальная длина 3 символа'
                },
                maxLength: {
                  value: 12,
                  message: 'максимальная длина 12 символов'
                },
              })}
            />

            {errors?.password ? <img className='error-img' src={errorImg} alt='error' /> : ''}

          </div>
          {errors?.password && <p>Field is required</p>}
          <p>Your password is between 4 and 12 characters</p>
        </label>

        <label>
          Input Text Label

          <div className={`${errors?.textLabel ? 'container error' : 'container'}`}>

            <input type='text'
              placeholder='Enter password'
              {...register('textLabel', {
                required: 'поле обязательно к заполнению',
                minLength: {
                  value: 4,
                  message: 'минимальная длина 3 символа'
                }
              })}
            />

            {errors?.textLabel ? <img className='error-img' src={errorImg} alt='error' /> : ''}
          </div>
          {errors?.textLabel && <p>Field is required</p>}
        </label>

        <div className='checkbox'>
          <input className='custom-checkbox' type='checkbox'
            placeholder='Enter password'
            {...register('checkbox')}
          />
          <span>Remember me</span>
        </div>


        <div className='switch-container'>
          <div className='switch'>
            <label className='switch'>
              <input type='checkbox' checked={switchState} onChange={() => setSwitchState(!switchState)} />
              <span className='slider round'></span>

            </label>
          </div>

          <div className='switch-info'>
            {switchState ? 'On' : 'Off'}
          </div>
        </div>


        <div >
          <div>
            <label className='radio'>
              <input type='radio' {...register('radioSelection')} value='Radio selection 1' />
              <p>Radio selection 1</p>
            </label>
            <label className='radio'>
              <input type='radio' {...register('radioSelection')} value='Radio selection 2' />
              <p>Radio selection 2</p>
            </label>
            <label className='radio'>
              <input type='radio' {...register('radioSelection')} value='Radio selection 3' />
              <p>Radio selection 3</p>
            </label>
          </div>

        </div>

        <div className='select-wrapper'>
          <label htmlFor='myDropdown'>Dropdown Title</label>
          <div className='custom-select'>
            <select id='myDropdown' {...register('dropdownTitle')}>
              <option value='dropdown option'>Dropdown option</option>
              <option value='Dropdown option 1'>Dropdown option 1</option>
              <option value='Dropdown option 2'>Dropdown option 2</option>
            </select>
          </div>
        </div>

        <div className='buttons'>
          <button className='submit'>Cancel</button>
          <button className='cancel' type='submit'>Next</button>
        </div>

      </form>
    </div>
  )
}
