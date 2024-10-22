import styles from './PostEvent.module.scss';
import React, { forwardRef, useEffect, useState } from 'react';
import { Input, TimePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ModalUploadPhoto from 'Components/ListingPhotos/PhotoUpload/ModalUploadPhoto/ModalUploadPhoto';
import { setIsSingle } from '../../../redux/UploadPhotos';
import DatePicker from 'react-datepicker';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { formatDataValue } from 'Helpers/editHoursHelpers';
import moment from 'moment/moment';
import { formatTime } from 'Helpers/helpers';
import PostCarousel from 'Components/ListingCreatePost/PostCarousel/PostCarousel';
import PostSelectBtnType from 'Components/ListingCreatePost/PostSelectBtnType/PostSelectBtnType';
import { Field, FormItem } from 'formik-antd';
import '../DatePicker.css';

function PostEvent({ validatePostFields, formikProps, post, setPost, imagesWithError, isFromPopper = false }) {

  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(post?.event?.schedule?.startDate ? new Date(post?.event?.schedule?.startDate?.year, post?.event?.schedule?.startDate?.month - 1, post?.event?.schedule?.startDate?.day) : new Date());
  const [endDate, setEndDate] = useState(post?.event?.schedule?.endDate ? new Date(post?.event?.schedule?.endDate?.year, post?.event?.schedule?.endDate?.month - 1, post?.event?.schedule?.endDate?.day) : new Date().setMonth(new Date().getMonth() + 1));
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [isTimePickerStart, setIsTimePickerStart] = useState(false);
  const [isTimePickerEnd, setIsTimePickerEnd] = useState(false);
  const [valueStartTime, setValueStartTime] = useState(post?.event?.schedule?.startTime && post?.event?.schedule?.startTime?.hours ? dayjs(formatDataValue(post?.event?.schedule?.startTime?.hours, post?.event?.schedule?.startTime?.minutes), 'HH:mm:ss') : dayjs(formatDataValue('00', '00'), 'HH:mm:ss'));
  const [valueEndTime, setValueEndTime] = useState(post?.event?.schedule?.endTime && post?.event?.schedule?.endTime?.hours ? dayjs(formatDataValue(post?.event?.schedule?.endTime?.hours, post?.event?.schedule?.endTime?.minutes), 'HH:mm:ss') : dayjs(formatDataValue('00', '00'), 'HH:mm:ss'));
  const startTime = moment({
    hours: '00',
    minutes: '00',
  });
  const endTime = moment({
    hours: '00',
    minutes: '00',
  });

  const [imgFromApiObj, setImgFromApiObj] = useState(post?.media?.length > 0 ? [{
    data_url: post?.media[0]?.googleUrl,
  }] : []);

  const handleSetStartDate = (date) => {
    setStartDate(date);
    if (date !== null) {
      let tmpPost = JSON.parse(JSON.stringify(post));

      const timeObj = {
        endTime: {
          hours: tmpPost?.event?.schedule?.endTime ? tmpPost?.event?.schedule?.endTime.hours : '00',
          minutes: tmpPost?.event?.schedule?.endTime ? tmpPost?.event?.schedule?.endTime.minutes : '00',
        },
        startTime: {
          hours: tmpPost?.event?.schedule?.startTime ? tmpPost?.event?.schedule?.startTime.hours : '00',
          minutes: tmpPost?.event?.schedule?.startTime ? tmpPost?.event?.schedule?.startTime.minutes : '00',
        },
        endDate: tmpPost?.event?.schedule?.endDate ? {
          day: tmpPost?.event?.schedule?.endDate?.day,
          month: tmpPost?.event?.schedule?.endDate?.month,
          year: tmpPost?.event?.schedule?.endDate?.year,
        } : null,
        startDate: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      };

      if (tmpPost?.event && tmpPost?.event?.schedule) {
        tmpPost.event.schedule.startDate = {
          'year': date.getFullYear(),
          'month': date.getMonth() + 1,
          'day': date.getDate(),
        };
      } else if (tmpPost?.event) {
        tmpPost.event.schedule = timeObj;
      } else {
        tmpPost.event =
          {
            schedule: timeObj,
          };
      }
      formikProps?.setFieldValue('postEventStartDate', date);
      setPost(tmpPost);
    }
  };

  const handleSetEndDate = (date) => {
    setEndDate(date);
    if (date !== null) {

      let tmpPost = JSON.parse(JSON.stringify(post));

      const timeObj = {
        endTime: {
          hours: tmpPost?.event?.schedule?.endTime ? tmpPost?.event?.schedule?.endTime.hours : '00',
          minutes: tmpPost?.event?.schedule?.endTime ? tmpPost?.event?.schedule?.endTime.minutes : '00',
        },
        startTime: {
          hours: tmpPost?.event?.schedule?.startTime ? tmpPost?.event?.schedule?.startTime.hours : '00',
          minutes: tmpPost?.event?.schedule?.startTime ? tmpPost?.event?.schedule?.startTime.minutes : '00',
        },
        endDate: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
        startDate: tmpPost?.event?.schedule?.startDate ? {
          day: tmpPost?.event?.schedule?.startDate?.day,
          month: tmpPost?.event?.schedule?.startDate?.month,
          year: tmpPost?.event?.schedule?.startDate?.year,
        } : null,
      };

      if (tmpPost?.event && tmpPost?.event?.schedule) {
        tmpPost.event.schedule.endDate = {
          'year': date.getFullYear(),
          'month': date.getMonth() + 1,
          'day': date.getDate(),
        };
      } else if (tmpPost?.event) {
        tmpPost.event.schedule = timeObj;
      } else {
        tmpPost.event =
          {
            schedule: timeObj,
          };
      }
      formikProps?.setFieldValue('postEventEndDate', date);
      setPost(tmpPost);
    }
  };

  const handleSetTitle = (value) => {
    let tmpPost = JSON.parse(JSON.stringify(post));
    tmpPost.name = value;

    if (tmpPost?.event) {
      tmpPost.event.title = value;
    } else {
      tmpPost.event = {
        title: value,
      };
    }

    formikProps?.setFieldValue('postEventTitle', value);

    setPost(tmpPost);
  };

  const onSelectStartTime = (time) => {
    setValueStartTime(time);
    let tmpPost = JSON.parse(JSON.stringify(post));

    const timeObj = {
      endTime: {
        hours: tmpPost?.event?.schedule?.endTime ? tmpPost?.event?.schedule?.endTime.hours : '00',
        minutes: tmpPost?.event?.schedule?.endTime ? tmpPost?.event?.schedule?.endTime.minutes : '00',
      },
      startTime: {
        hours: time ? formatTime(time['$H']) : '00',
        minutes: time ? formatTime(time['$m']) : '00',
      },
      endDate: tmpPost?.event?.schedule?.endDate ? {
        day: tmpPost?.event?.schedule?.endDate?.day,
        month: tmpPost?.event?.schedule?.endDate?.month,
        year: tmpPost?.event?.schedule?.endDate?.year,
      } : null,
      startDate: tmpPost?.event?.schedule?.startDate ? {
        day: tmpPost?.event?.schedule?.startDate?.day,
        month: tmpPost?.event?.schedule?.startDate?.month,
        year: tmpPost?.event?.schedule?.startDate?.year,
      } : null,
    };

    if (tmpPost?.event && tmpPost?.event?.schedule) {
      tmpPost.event.schedule.startTime = {
        hours: time ? formatTime(time['$H']) : '00',
        minutes: time ? formatTime(time['$m']) : '00',
      };
    } else if (tmpPost?.event) {
      tmpPost.event.schedule = timeObj;
    } else {
      tmpPost.event =
        {
          schedule: timeObj,
        };
    }

    formikProps?.setFieldValue('postEventStartTime', time);
    setPost(tmpPost);
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input className={isFromPopper ? styles.customInputPopper : styles.customInput} readOnly onClick={onClick} ref={ref}
           value={value} />
  ));

  CustomInput.displayName = "CustomInput"

  const onSelectEndTime = (time) => {
    setValueEndTime(time);
    let tmpPost = JSON.parse(JSON.stringify(post));

    const timeObj = {
      endTime: {
        hours: time ? formatTime(time['$H']) : '00',
        minutes: time ? formatTime(time['$m']) : '00',
      },
      startTime: {
        hours: tmpPost?.event?.schedule?.startTime ? tmpPost?.event?.schedule?.startTime.hours : '00',
        minutes: tmpPost?.event?.schedule?.startTime ? tmpPost?.event?.schedule?.startTime.minutes : '00',
      },
      endDate: tmpPost?.event?.schedule?.endDate ? {
        day: tmpPost?.event?.schedule?.endDate?.day,
        month: tmpPost?.event?.schedule?.endDate?.month,
        year: tmpPost?.event?.schedule?.endDate?.year,
      } : null,
      startDate: tmpPost?.event?.schedule?.startDate ? {
        day: tmpPost?.event?.schedule?.startDate?.day,
        month: tmpPost?.event?.schedule?.startDate?.month,
        year: tmpPost?.event?.schedule?.startDate?.year,
      } : null,
    };

    if (tmpPost?.event && tmpPost?.event?.schedule) {
      tmpPost.event.schedule.endTime = {
        hours: time ? formatTime(time['$H']) : '00',
        minutes: time ? formatTime(time['$m']) : '00',
      };
    } else if (tmpPost?.event) {
      tmpPost.event.schedule = timeObj;
    } else {
      tmpPost.event =
        {
          schedule: timeObj,
        };
    }

    formikProps?.setFieldValue('postEventEndTime', time);
    setPost(tmpPost);
  };

  useEffect(() => {
    let tmpPost = JSON.parse(JSON.stringify(post));
    const formattedEndDate = new Date(endDate);
    tmpPost.event = {
      schedule: {
        startDate: {
          day: startDate.getDate(),
          month: startDate.getMonth() + 1,
          year: startDate.getFullYear(),
        },
        endDate: {
          day: formattedEndDate.getDate(),
          month: formattedEndDate.getMonth() + 1,
          year: formattedEndDate.getFullYear(),
        },
        startTime: {
          hours: '00',
          minutes: '00',
        },
        endTime: {
          hours: '00',
          minutes: '00',
        },
      },
      title: tmpPost?.event?.title
    };

    tmpPost.callToAction = {
      actionType: 'ACTION_TYPE_UNSPECIFIED',
    };

    formikProps?.setFieldValue('postEventStartDate', startDate);
    formikProps?.setFieldValue('postEventEndDate', formattedEndDate);
    formikProps?.setFieldValue('postEventStartTime', '00:00');
    formikProps?.setFieldValue('postEventEndTime', '00:00');
    setPost(tmpPost)
  }, []);

  const handleAddPhoto = () => {
    dispatch(setIsSingle(true));
    setOpenModal(true);
  };

  const handleSetDescription = (value) => {
    if (value?.length <= 1500) {
      let tmpPost = JSON.parse(JSON.stringify(post));
      tmpPost.summary = value;
      if (tmpPost?.media?.length > 0) {
        tmpPost?.media?.forEach((media) => {
          media.description = value;
        });
      } else {
        tmpPost.media = [{
          description: value,
        }];
      }

      setPost(tmpPost);
    }

    formikProps?.setFieldValue('postDescription', value);
  };

  const handleSetBtnLink = (value) => {
    let tmpPost = JSON.parse(JSON.stringify(post));
    if (tmpPost?.callToAction) {
      tmpPost.callToAction.url = value;
    } else {
      tmpPost.callToAction = {
        actionType: '',
        url: value,
      };
    }

    formikProps?.setFieldValue('postBtnLink', value);
    setPost(tmpPost);
  };

  const handleValidateFormikImgData = (data) => {
    formikProps?.setFieldValue('postEventMedia', data);

    if (data?.length > 0)
      formikProps?.setFieldValue('postDescription', "description");
  };

  return (
    <div className={isFromPopper ? styles.containerEditInfo : styles.containerEditInfoPage}>
      <ModalUploadPhoto
        openUploadPhoto={openModal}
        setOpenUploadPhoto={setOpenModal}
        fromListingPhotos={false}
      />
      <div style={isFromPopper ? { display: 'flex', marginTop: '1rem', flexDirection: 'column' } : {
        display: 'flex',
        marginTop: 30,
      }}>
        <div className={styles.containerInputLeftItem} style={isFromPopper ? { width: '100%' } : {}}>
          <span className={styles.label}>{t('Titolo evento')}</span>
          <FormItem
            name="postEventTitle"
            required={true}
            validate={(value) => validatePostFields(value, 'postEventTitle')}
            style={!isFromPopper ? { marginBottom: '3rem' } : {}}
          >
            <Input type={'text'}
                   style={isFromPopper ? { width: '100%' } : { width: '95%' }}
                   className={isFromPopper ? styles.inputPopper : styles.input}
                   value={post?.event?.title}
                   placeholder={t('Esempio: 20% di sconto in negozio o online')}
                   onChange={(e) => handleSetTitle(e.target.value)}
                   name={'postEventTitle'}
            />
          </FormItem>
          <div style={isFromPopper ? { display: 'flex', marginBottom: '1rem' } : {
            display: 'flex',
          }}>
            <div className={styles.containerInput} style={isFromPopper ? { paddingRight: 20 } : {}}>
              <span className={styles.label}>{t('Data di inizio')}</span>
              <FormItem
                name="postEventStartDate"
                required={true}
                validate={(value) => validatePostFields(value, 'postEventStartDate')}
                style={!isFromPopper ? { marginBottom: '3rem' } : {}}
              >
                <DatePicker
                  name="postEventStartDate"
                  selected={startDate}
                  onChange={(date) => handleSetStartDate(date)}
                  selectsRange={false}
                  isClearable={false}
                  shouldCloseOnSelect={true}
                  startOpen={false}
                  preventOpenOnFocus={true}
                  allowSameDay={true}
                  placeholderText="00/00/0000"
                  dateFormat="dd/MM/yyyy"
                  wrapperClassName="datePicker"
                  customInput={<CustomInput />}
                />
              </FormItem>
            </div>
            <div className={styles.containerInput}>
              <span className={styles.label}>{t('Data di fine')}</span>
              <FormItem
                name="postEventEndDate"
                required={true}
                validate={(value) => validatePostFields(value, 'postEventEndDate')}
                style={!isFromPopper ? { marginBottom: '3rem' } : {}}
              >
                <DatePicker
                  name="postEventEndDate"
                  selected={endDate}
                  onChange={(date) => handleSetEndDate(date)}
                  selectsRange={false}
                  isClearable={false}
                  shouldCloseOnSelect={true}
                  startOpen={false}
                  preventOpenOnFocus={true}
                  allowSameDay={true}
                  placeholderText="00/00/0000"
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomInput />}
                />
              </FormItem>
            </div>
          </div>
          <div style={isFromPopper ? { display: 'flex', marginBottom: '1rem' } : {
            display: 'flex',
          }}>
            <div className={styles.timePickers} style={isFromPopper ? { paddingRight: 20 } : {}}>
              <span className={styles.label}>{t('Orario di inizio')}</span>
              <FormItem
                name="postEventStartTime"
                required={true}
                validate={(value) => validatePostFields(value, 'postEventStartTime')}
                style={!isFromPopper ? { marginBottom: '3rem' } : {}}
              >
                <TimePicker className={isFromPopper ? styles.pickerPopper : styles.picker}
                            onOpenChange={(e) => setIsTimePickerStart(e)}
                            placeholder={`Open at: ${startTime.format('HH:mm')}`}
                            onChange={onSelectStartTime}
                            suffixIcon={
                              isTimePickerStart ? <CaretDownOutlined /> : <CaretRightOutlined />
                            }
                            format="HH:mm"
                            picker="time"
                            minuteStep={5}
                            value={valueStartTime}
                            name={'postEventStartTiime'}
                />
              </FormItem>
            </div>
            <div className={styles.timePickers}>
              <span className={styles.label}>{t('Orario di fine')}</span>
              <FormItem
                name="postEventEndTime"
                required={true}
                validate={(value) => validatePostFields(value, 'postEventEndTime')}
                style={!isFromPopper ? { marginBottom: '3rem' } : {}}
              >
                <TimePicker className={isFromPopper ? styles.pickerPopper : styles.picker}
                            onOpenChange={(e) => setIsTimePickerEnd(e)}
                            placeholder={`Close at: ${endTime.format('HH:mm')}`}
                            onChange={onSelectEndTime}
                            suffixIcon={
                              isTimePickerEnd ? <CaretDownOutlined /> : <CaretRightOutlined />
                            }
                            format="HH:mm"
                            picker="time"
                            minuteStep={5}
                            value={valueEndTime}
                            name="postEventEndTime"
                />
              </FormItem>
            </div>
          </div>
          <div className={styles.containerInput} style={isFromPopper ? { width: '100%' } : { width: '80%' }}>
            <span className={styles.label}>{t('Dettagli eventi')}</span>
            <FormItem
              name="postDescription"
              required={true}
              validate={(value) => validatePostFields(value, 'postDescription')}
              key={'postDescription'}
            >
              <Field
                name="postDescription"
                value={post?.media?.length > 0 ? post?.media[0]?.description : ''}
                className={isFromPopper ? styles.inputTextAreaPopper : styles.inputTextArea}
                onChange={(e) => handleSetDescription(e.target.value)}
                placeholder={t('Aggiungi dettagli...')}
                rows={isFromPopper ? 2 : 4}
                as={'textarea'}
              />
            </FormItem>
            <span className={styles.labelCharCounter}>{post?.summary ? post?.summary?.length + ' / 1500' : '0 / 1500' }</span>
          </div>
        </div>
        <div className={isFromPopper ? styles.containerPhotoPopper : styles.containerInputRightItem}>
          <span className={styles.label}>{t('Aggiungi foto')}</span>
          <div style={{ display: 'flex' }}>
            <PostCarousel handleFormikValidation={handleValidateFormikImgData} imagesWithError={imagesWithError} imgFromApi={imgFromApiObj} isFromPopper={isFromPopper} handleAddPhoto={handleAddPhoto}/>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.containerInput}>
          <span className={styles.label}>{t('Aggiungi pulsante')}</span>
          <div style={{ width: '92%', marginTop: 15, display: 'flex' }}>
            <PostSelectBtnType post={post} setPost={setPost} />
            {post?.callToAction?.actionType !== 'ACTION_TYPE_UNSPECIFIED' &&
              <FormItem
                name="postBtnLink"
                required={true}
                validate={(value) => validatePostFields(value, 'postBtnLink')}
                style={!isFromPopper ? { width: '100%', marginBottom: '3rem' } : {}}
                key={'postBtnLink'}
              >
                <Input
                  type={'text'}
                  name={'postBtnLink'}
                  className={isFromPopper ? styles.inputPopper : styles.input}
                  value={post?.callToAction?.url}
                  placeholder={t('Link per il pulsante')}
                  onChange={(e) => handleSetBtnLink(e.target.value)} />
              </FormItem>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostEvent;