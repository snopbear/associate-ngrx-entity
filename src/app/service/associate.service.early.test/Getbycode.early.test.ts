
// Unit tests for: Getbycode


import { IAssociates } from '../../model/associates';
import { AssociateService } from '../associate.service';


class MockHttpClient {
  public get = jest.fn();
}

describe('AssociateService.Getbycode() Getbycode method', () => {
  let service: AssociateService;
  let mockHttpClient: MockHttpClient;

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    service = new AssociateService(mockHttpClient as any);
  });

  describe('Happy Path', () => {
    it('should return an associate when a valid code is provided', async () => {
      // Arrange
      const mockAssociate: IAssociates = { id: 1, name: 'John Doe' };
      mockHttpClient.get.mockResolvedValue(mockAssociate as any as never);

      // Act
      const result = await service.Getbycode(1);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:3000/associate/1');
      expect(result).toEqual(mockAssociate);
    });
  });

  describe('Edge Cases', () => {
    it('should handle non-existent code gracefully', async () => {
      // Arrange
      mockHttpClient.get.mockResolvedValue(null as any as never);

      // Act
      const result = await service.Getbycode(999);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:3000/associate/999');
      expect(result).toBeNull();
    });

    it('should handle network errors gracefully', async () => {
      // Arrange
      const error = new Error('Network Error');
      mockHttpClient.get.mockRejectedValue(error as never);

      // Act & Assert
      await expect(service.Getbycode(1)).rejects.toThrow('Network Error');
      expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:3000/associate/1');
    });

    it('should handle invalid code types gracefully', async () => {
      // Arrange
      const invalidCode = 'invalid' as any;
      mockHttpClient.get.mockResolvedValue(null as any as never);

      // Act
      const result = await service.Getbycode(invalidCode);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:3000/associate/invalid');
      expect(result).toBeNull();
    });
  });
});

// End of unit tests for: Getbycode
