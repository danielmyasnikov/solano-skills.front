import styles from './styles.module.less';
import { useHistory } from 'react-router-dom';
import Icon from './assets/Icon.svg';
import cn from 'classnames';
import { useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { paySubscription } from '@src/features/payment/store/actions';
import { selectIsAuth, selectProfile } from '@store/profile/selector';
import { useChangeSubscriptionTypeMutation } from '@src/features/payment/store/payments.api';

export const Tariffs = ({ tariffList, isTariffs }) => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [changeSubscriptionTypeMutation, { isLoading: isUpdating }] =
    useChangeSubscriptionTypeMutation();
  const profile = useSelector(selectProfile);
  const history = useHistory();

  const paymentHandler = (id) => {
    if (isAuth) {
      dispatch(paySubscription(id));
    } else {
      history.push('/sign-in');
    }
  };

  const changeSubscriptionType = (id) => {
    changeSubscriptionTypeMutation({ id });
  };

  useEffect(() => {
    isUpdating && history.push('/resubscribe-payment');
  }, [isUpdating]);

  return (
    <>
      {tariffList.map(({ id, title, total_price, is_economy, is_optimal }) => (
        <div
          key={id}
          className={cn(styles.tariff, {
            [styles.border]: isTariffs,
            [styles.green]: is_optimal,
          })}
        >
          <Grid container>
            <Grid item xs={12} md={3} className={styles.title}>
              <div>{id === 1 ? 'Годовой' : 'Месячный'}</div>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <ul className={cn(styles.list)}>
                <li className={styles.item}>
                  <img src={Icon} alt="Успешная операция" />
                  <span>15 курсов</span>
                </li>
                <li className={cn(styles.item, { [styles.economy]: is_economy })}>
                  <img src={Icon} alt="Успешная операция" />
                  <span>Полный доступ</span>
                </li>
                <li className={cn(styles.item, { [styles.economy]: is_economy })}>
                  <img src={Icon} alt="Успешная операция" />
                  <span>Сертификат</span>
                </li>
              </ul>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              className={cn(styles.price, { [styles.green]: is_optimal })}
            >
              <span>{(is_economy && total_price) || `${total_price}₽/месяц`}</span>
              {id === 1 && (
                <small>
                  * К оплате 11 880 руб за годовой доступ ко всему контенту образовательной
                  платформы DeepSkills
                </small>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={3} className={styles.wrapperButton}>
              {profile.subscription_type ? (
                <>
                  {profile.subscription_type === 'month' ? (
                    <>
                      {id === 1 ? (
                        <Button
                          variant="containedPurple"
                          onClick={() => changeSubscriptionType(id)}
                        >
                          Сменить тарифный план
                        </Button>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                          }}
                          className={cn(styles.price, { [styles.green]: is_optimal })}
                        >
                          <span>Активен</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {id === 1 ? (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                          }}
                          className={cn(styles.price, { [styles.green]: is_optimal })}
                        >
                          <span>Активен</span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Button
                  onClick={() => {
                    // dispatch(closeTariffsModal({}));
                    paymentHandler(id);
                    /*

                    history.push({
                      pathname: '/payment',
                      state: {
                        id: id,
                        title: title,
                        price: price,
                        oldPrice: old_price,
                        totalPrice: total_price,
                        description: description,
                        confirmationText: confirmation_text,
                        cycle: cycle,
                      },
                    });

                     */
                  }}
                  className={styles.button}
                  variant={id === 1 ? 'outlinePurple' : 'containedPurple'}
                >
                  Активировать
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      ))}
    </>
  );
};
