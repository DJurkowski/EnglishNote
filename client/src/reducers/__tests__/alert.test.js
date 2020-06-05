import { SET_ALERT, REMOVE_ALERT } from '../../actions/types';
import alert from '../alert';

describe('Alert reducer', () => {

    test('Should return default state', () => {
        const newState = alert(undefined, {});
        expect(newState).toEqual([]);
    });

    test('Should return array with new state if receiving type SET_ALERT', () => {
        const payload = { msg: 'Alert message', alertType: 'alert type', id: 1 };
        const newState = alert(undefined, {
            type: SET_ALERT,
            payload
        });
        expect(newState).toEqual([payload]);
    });

    test('Should return empty state if receiving type REMOVE_ALERT', () => {
        const payload = { id: 1 };
        const newState = alert(undefined, {
            type: REMOVE_ALERT,
            payload
        });
        expect(newState).toEqual([]);
    });
});
