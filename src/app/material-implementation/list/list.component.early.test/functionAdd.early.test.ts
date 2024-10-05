
// Unit tests for: functionAdd


import { openPopup } from '../../../store/associate/associate.actions';
import { AddComponent } from '../../add/add.component';
import { ListComponent } from '../list.component';



// Mock classes
class MockMatDialog {
  open = jest.fn();
}

class MockStore {
  dispatch = jest.fn();
  select = jest.fn().mockReturnValue({ subscribe: jest.fn() });
}

describe('ListComponent.functionAdd() functionAdd method', () => {
  let component: ListComponent;
  let mockDialog: MockMatDialog;
  let mockStore: MockStore;

  beforeEach(() => {
    mockDialog = new MockMatDialog() as any;
    mockStore = new MockStore() as any;
    component = new ListComponent(mockDialog as any, mockStore as any);
  });

  describe('Happy Path', () => {
    it('should open a dialog with the correct parameters', () => {
      // Arrange
      const expectedCode = 0;
      const expectedTitle = 'Create Association';

      // Act
      component.functionAdd();

      // Assert
      expect(mockStore.dispatch).toHaveBeenCalledWith(openPopup());
      expect(mockDialog.open).toHaveBeenCalledWith(AddComponent, {
        width: '50%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: { code: expectedCode, title: expectedTitle },
      });
    });
  });

  describe('Edge Cases', () => {
    // Since functionAdd does not take any parameters or have complex logic,
    // there are no specific edge cases to test for this method.
    // However, if the method were to be extended in the future, edge cases could be added here.
  });
});

// End of unit tests for: functionAdd
