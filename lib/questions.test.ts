import { getMaturityLevel, getRecommendations, assessmentCategories } from './questions';

describe('Assessment Logic', () => {
  describe('getMaturityLevel', () => {
    it('returns Digital Leader for 90%+', () => {
      expect(getMaturityLevel(95).level).toBe('Digital Leader');
      expect(getMaturityLevel(90).level).toBe('Digital Leader');
    });

    it('returns Digital Advanced for 70-89%', () => {
      expect(getMaturityLevel(89).level).toBe('Digital Advanced');
      expect(getMaturityLevel(70).level).toBe('Digital Advanced');
    });

    it('returns Digital Intermediate for 50-69%', () => {
      expect(getMaturityLevel(69).level).toBe('Digital Intermediate');
      expect(getMaturityLevel(50).level).toBe('Digital Intermediate');
    });

    it('returns Digital Emerging for 30-49%', () => {
      expect(getMaturityLevel(49).level).toBe('Digital Emerging');
      expect(getMaturityLevel(30).level).toBe('Digital Emerging');
    });

    it('returns Digital Beginner for <30%', () => {
      expect(getMaturityLevel(29).level).toBe('Digital Beginner');
      expect(getMaturityLevel(0).level).toBe('Digital Beginner');
    });
  });

  describe('getRecommendations', () => {
    it('returns correct recommendations based on low scores', () => {
      const lowScores = {
        technology: 5,
        data: 5,
        process: 5,
        customer: 5,
        workforce: 5
      };
      const recs = getRecommendations(lowScores);
      expect(recs.length).toBeGreaterThan(0);
      expect(recs[0]).toContain('migrating to cloud-based infrastructure');
    });

    it('returns fewer recommendations for high scores', () => {
      const highScores = {
        technology: 20,
        data: 20,
        process: 20,
        customer: 20,
        workforce: 20
      };
      const recs = getRecommendations(highScores);
      expect(recs.length).toBe(0);
    });
  });

  describe('Data Integrity', () => {
    it('has 5 categories', () => {
      expect(assessmentCategories.length).toBe(5);
    });

    it('each category has 4 questions', () => {
      assessmentCategories.forEach(cat => {
        expect(cat.questions.length).toBe(4);
      });
    });

    it('each question has 5 options', () => {
      assessmentCategories.forEach(cat => {
        cat.questions.forEach(q => {
          expect(q.options.length).toBe(5);
        });
      });
    });
  });
});
