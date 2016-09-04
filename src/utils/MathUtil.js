const DEGREE_TO_RADIUS = Math.PI / 180;

export default class MathUtil {
    static degreeToRadius(degree) {
        return degree * DEGREE_TO_RADIUS;
    }
}
