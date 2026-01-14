import useStatus from '../useStatus';
import { MoveStatus } from '@repo/constants/constants';
import { colors } from '@repo/themes';
import messages from '@repo/constants/messages';

describe('useStatus', () => {
  let status: any;

  beforeEach(() => {
    status = useStatus();
  });

  describe('moveStatusName', () => {
    it('should return the correct status name for waiting', () => {
      expect(status.moveStatusName(MoveStatus.waiting)).toBe(messages.Status.waiting);
    });

    it('should return the correct status name for pending_checklist', () => {
      expect(status.moveStatusName(MoveStatus.pending_checklist)).toBe(messages.Status.pending_checklist);
    });

    it('should return the correct status name for done', () => {
      expect(status.moveStatusName(MoveStatus.done)).toBe(messages.Status.done);
    });

    it('should return default for unknown status', () => {
      expect(status.moveStatusName('unknown')).toBe(messages.Status.default);
    });
  });

  describe('moveStatusColor', () => {
    it('should return royalBlue for waiting', () => {
      expect(status.moveStatusColor(MoveStatus.waiting)).toBe(colors.royalBlue);
    });

    it('should return darkYellow for pending_checklist', () => {
      expect(status.moveStatusColor(MoveStatus.pending_checklist)).toBe(colors.darkYellow);
    });

    it('should return kellyGreen for done', () => {
      expect(status.moveStatusColor(MoveStatus.done)).toBe(colors.kellyGreen);
    });

    it('should return red for cancelled', () => {
      expect(status.moveStatusColor(MoveStatus.cancelled)).toBe(colors.red);
    });

    it('should return gray for unknown status', () => {
      expect(status.moveStatusColor('unknown')).toBe(colors.gray);
    });
  });

  describe('moveStatusStyles', () => {
    it('should return correct styles for waiting', () => {
      expect(status.moveStatusStyles(MoveStatus.waiting)).toEqual({
        background: colors.pastelBlue,
        color: colors.darkBlue,
        text: 'Waiting',
      });
    });

    it('should return correct styles for pending_move', () => {
      expect(status.moveStatusStyles(MoveStatus.pending_move)).toEqual({
        background: colors.lightYellow,
        color: colors.darkYellow,
        text: 'Pending Move',
      });
    });

    it('should return correct styles for done', () => {
      expect(status.moveStatusStyles(MoveStatus.done)).toEqual({
        background: colors.mintCreamGreen,
        color: colors.forestGreen,
        text: 'Completed',
      });
    });

    it('should return correct styles for cancelled', () => {
      expect(status.moveStatusStyles(MoveStatus.cancelled)).toEqual({
        background: colors.lightRed,
        color: colors.red,
        text: 'Canceled Move',
      });
    });

    it('should return default styles for unknown status', () => {
      expect(status.moveStatusStyles('unknown')).toEqual({
        background: colors.softGray,
        color: colors.black,
        text: 'Unknown',
      });
    });
  });

  describe('yardLineColor', () => {
    it('should return correct color for RL', () => {
      expect(status.yardLineColor('RL')).toEqual({ color: '#da291c', initials: 'RL' });
    });

    it('should return correct color for OL', () => {
      expect(status.yardLineColor('OL')).toEqual({ color: '#ed8b00', initials: 'OL' });
    });

    it('should return correct color for GL', () => {
      expect(status.yardLineColor('GL')).toEqual({ color: '#00843d', initials: 'GL' });
    });

    it('should return correct color for BL', () => {
      expect(status.yardLineColor('BL')).toEqual({ color: '#003da5', initials: 'BL' });
    });

    it('should return default color for unknown initials', () => {
      expect(status.yardLineColor('XX')).toEqual({ color: '#000', initials: 'XX' });
    });
  });

  describe('moveStatusList', () => {
    it('should return an array of move statuses', () => {
      expect(status.moveStatusList).toEqual([
        "waiting",
        "pending_checklist",
        "pending_move",
        "pending_yardmaster_signature",
        "done",
        "cancelled",
        "inspection_failed",
        "inspection_failed_pending_signature",
      ]);
    });
  });
});
