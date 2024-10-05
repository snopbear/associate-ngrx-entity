
// Unit tests for: ClosePopup


import { AddComponent } from '../add.component';



// Mock classes
class MockFormGroup {
  // Mock properties and methods as needed
}

class MockFormBuilder {
  group = jest.fn().mockReturnValue(new MockFormGroup() as any);
  control = jest.fn();
}

class MockMatDialogRef {
  close = jest.fn();
}

class MockStore {
  dispatch = jest.fn();
  select = jest.fn().mockReturnValue({
    subscribe: jest.fn(),
  });
}

describe('AddComponent.ClosePopup() ClosePopup method', () => {
  let mockFormBuilder: MockFormBuilder;
  let mockMatDialogRef: MockMatDialogRef;
  let mockStore: MockStore;
  let component: AddComponent;

  beforeEach(() => {
    mockFormBuilder = new MockFormBuilder();
    mockMatDialogRef = new MockMatDialogRef();
    mockStore = new MockStore();

    component = new AddComponent(
      mockFormBuilder as any,
      mockMatDialogRef as any,
      {} as any, // Mock MAT_DIALOG_DATA
      mockStore as any
    );
  });

  describe('Happy Path', () => {
    it('should close the dialog when ClosePopup is called', () => {
      // Act
      component.ClosePopup();

      // Assert
      expect(mockMatDialogRef.close).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle the case when MatDialogRef is undefined', () => {
      // Arrange
      component = new AddComponent(
        mockFormBuilder as any,
        undefined as any, // Simulate undefined MatDialogRef
        {} as any,
        mockStore as any
      );

      // Act & Assert
      expect(() => component.ClosePopup()).not.toThrow();
    });

    it('should handle the case when MatDialogRef.close throws an error', () => {
      // Arrange
      mockMatDialogRef.close.mockImplementation(() => {
        throw new Error('Close error');
      });

      // Act & Assert
      expect(() => component.ClosePopup()).toThrow('Close error');
    });
  });
});

// End of unit tests for: ClosePopup
