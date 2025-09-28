export interface Exercise {
  id: number
  germanName: string
  englishName: string
  description: string
  reps?: number
  duration?: number
  sets?: number
  focusPoints?: string[]
  requiresPartner?: boolean
  levels?: {
    description: string
    reps?: number
    duration?: number
    sets?: number
    focusPoints?: string[]
  }[]
}

export interface Phase {
  id: number
  title: string
  description: string
  totalDuration: number
  exercises: Exercise[]
}

export const exerciseData: Phase[] = [
  {
    id: 1,
    title: "Laufübungen (Running Exercises)",
    description: "Dynamic warm-up and mobility drills",
    totalDuration: 480, // 8 minutes
    exercises: [
      {
        id: 1,
        germanName: "LAUFEN GERADEAUS",
        englishName: "Running Straight Ahead",
        description:
          "Run from the first marker to the last (6-10 markers, 5-6 m apart). Run outward on the way there, and inward on the way back. Start slow/warm-up pace and increase on the return trip.",
        reps: 2,
        sets: 1,
        focusPoints: ["Start slow and gradually increase pace", "Maintain proper running form"],
      },
      {
        id: 2,
        germanName: "LAUFEN HÜFTDREHUNG NACH AUSSEN",
        englishName: "Hip Rotation Outward",
        description:
          "Walk/jog to the first marker and stop. Lift the knee forward, rotate the knee outward, and set the leg down. Repeat with the other leg at the next marker.",
        reps: 2,
        sets: 1,
        focusPoints: ["Control the hip rotation movement", "Maintain balance throughout"],
      },
      {
        id: 3,
        germanName: "LAUFEN HÜFTDREHUNG NACH INNEN",
        englishName: "Hip Rotation Inward",
        description:
          "Walk/jog to the first marker and stop. Lift the knee sideways, rotate the knee forward, and set the leg down. Repeat with the other leg at the next marker.",
        reps: 2,
        sets: 1,
        focusPoints: ["Control the hip rotation movement", "Maintain balance throughout"],
      },
      {
        id: 4,
        germanName: "LAUFEN SEITGALOPP",
        englishName: "Sideways Gallop (Around Partner)",
        description:
          "Run to the first marker. Perform a lateral gallop toward a partner, go around the partner (without changing gaze/direction of view), and return to the starting marker.",
        reps: 2,
        sets: 1,
        requiresPartner: true,
        focusPoints: ["Body weight on the forefoot", "Hips and knees slightly bent", "Maintain low center of gravity"],
      },
      {
        id: 5,
        germanName: "LAUFEN SCHULTERKONTAKT",
        englishName: "Shoulder Contact",
        description:
          "Run to the first marker. Perform a lateral gallop toward a partner. Jump sideways against each other in the middle so the shoulders touch.",
        reps: 2,
        sets: 1,
        requiresPartner: true,
        focusPoints: [
          "Must land on both feet with bent hips and knees",
          "Knees must NOT buckle inward",
          "Jump and land simultaneously with partner",
        ],
      },
      {
        id: 6,
        germanName: "LAUFEN VOR UND ZURÜCK SPRINTEN",
        englishName: "Forward and Backward Sprint",
        description:
          "Sprint forward to the second marker, then sprint backward to the first marker (maintain slightly bent hips/knees). Repeat: sprint two markers forward, one marker backward, continuing the circuit.",
        reps: 2,
        sets: 1,
        focusPoints: ["Use small, quick steps", "Maintain slight bend in hips and knees when running backward"],
      },
    ],
  },
  {
    id: 2,
    title: "Kraft · Plyometrie · Gleichgewicht",
    description: "Core stability, eccentric strength, balance training, and plyometrics",
    totalDuration: 600, // 10 minutes
    exercises: [
      {
        id: 7,
        germanName: "UNTERARMSTÜTZ",
        englishName: "Plank",
        description: "Standard forearm plank. Elbows directly under shoulders. Maintain a straight line.",
        focusPoints: ["Do not allow the back to sag", "Maintain straight line from head to heels"],
        levels: [
          {
            description: "Standard forearm plank hold",
            duration: 25,
            sets: 3,
          },
          {
            description: "Standard plank position. Alternately lift each leg for approx. 2 seconds. Keep hips stable.",
            duration: 50,
            sets: 3,
          },
          {
            description: "Standard plank position. Lift one leg approx. 10-15 cm off the floor.",
            duration: 25,
            sets: 3,
            focusPoints: ["Do not let the opposite hip tilt downward", "Perform on each leg"],
          },
        ],
      },
      {
        id: 8,
        germanName: "SEITLICHER UNTERARMSTÜTZ",
        englishName: "Side Plank",
        description: "Side plank on forearm, supporting on forearm and leg.",
        focusPoints: ["Maintain straight line from shoulder to foot"],
        levels: [
          {
            description:
              "Side plank on forearm, bottom knee bent at right angle, supporting on forearm and bottom leg. Lift hip/upper body to form straight line.",
            duration: 25,
            sets: 3,
            focusPoints: ["Perform on each side"],
          },
          {
            description:
              "Side plank on forearm, both legs straight. Lower the hip toward the floor and raise it again.",
            duration: 25,
            sets: 3,
            focusPoints: ["Perform on each side", "Maintain straight line from shoulder to foot"],
          },
          {
            description: "Side plank on forearm, both legs straight. Slowly raise and lower the upper leg.",
            duration: 25,
            sets: 3,
            focusPoints: ["Perform on each side", "Control the leg movement"],
          },
        ],
      },
      {
        id: 9,
        germanName: "OBERSCHENKELRÜCKSEITE",
        englishName: "Nordic Hamstring Curls",
        description:
          "Partner holds lower legs firmly against the ground. Maintain straight line from shoulders to knees throughout. Lower body slowly forward, resisting with hamstrings/glutes.",
        requiresPartner: true,
        focusPoints: [
          "Maintain straight line from shoulders to knees",
          "Lower slowly with control",
          "Catch weight with hands when resistance fails",
        ],
        levels: [
          {
            description: "Beginner level Nordic hamstring curls",
            reps: 5,
            sets: 1,
          },
          {
            description: "Intermediate level Nordic hamstring curls",
            reps: 8,
            sets: 1,
          },
          {
            description: "Advanced level Nordic hamstring curls",
            reps: 13,
            sets: 1,
          },
        ],
      },
      {
        id: 10,
        germanName: "EINBEINSTAND",
        englishName: "Single Leg Balance",
        description: "Stand on one slightly bent leg. Focus on balance and stability.",
        focusPoints: ["Weight on the forefoot", "Knee must NOT buckle inward"],
        levels: [
          {
            description:
              "Stand on one slightly bent leg. Hold a ball in two hands in front of the body. Increase difficulty by circling the ball around the hip and/or free knee.",
            duration: 30,
            sets: 2,
            focusPoints: ["Perform on each leg", "Weight on the forefoot", "Knee must NOT buckle inward"],
          },
          {
            description:
              "Two players face each other (2-3m distance) standing on one leg. Throw a ball back and forth.",
            duration: 30,
            sets: 2,
            requiresPartner: true,
            focusPoints: ["Perform on each leg", "Abs tight", "Knee only slightly bent, must NOT buckle inward"],
          },
          {
            description:
              "Two players face each other (arm's length apart) standing on one leg. Partners alternate attempting to push the other off balance in various directions.",
            duration: 30,
            sets: 2,
            requiresPartner: true,
            focusPoints: ["Perform on each leg", "Knee must NOT buckle inward"],
          },
        ],
      },
      {
        id: 11,
        germanName: "KNIEBEUGEN",
        englishName: "Squats/Lunges",
        description: "Various squatting and lunging movements for leg strength.",
        focusPoints: ["Knees must NOT buckle inward"],
        levels: [
          {
            description:
              "Stand hip-width apart. Slowly bend hips, knees, and ankles until knees form right angle. Quickly stretch up onto the toes, then slowly return.",
            duration: 30,
            sets: 2,
            focusPoints: ["Knees must NOT buckle inward", "Control the movement"],
          },
          {
            description:
              "Perform slow, steady forward lunges. Front knee forms a right angle. Cross the field (approx. 10 steps per leg), then jog back to recover.",
            reps: 2,
            sets: 1,
            focusPoints: ["Knees must NOT buckle inward", "Torso/hips must not tilt sideways"],
          },
          {
            description:
              "Stand on one leg (lightly hold onto partner for balance). Slowly bend the knee as far as possible (up to 90 degrees). Bend slowly, stretch slightly faster.",
            reps: 10,
            sets: 2,
            focusPoints: ["Perform on each leg", "Torso and hip must not tilt sideways"],
          },
        ],
      },
      {
        id: 12,
        germanName: "SPRINGEN",
        englishName: "Jumping/Plyometrics",
        description: "Various jumping exercises for power and landing mechanics.",
        focusPoints: ["Knees must NOT buckle inward", "Land softly on forefoot"],
        levels: [
          {
            description:
              "Squat slowly as if sitting on a chair (knees at right angle). Hold for 2 sec. Jump as high as possible. Land softly on forefoot, keeping hips and knees slightly bent.",
            duration: 30,
            sets: 2,
            focusPoints: ["Knees must NOT buckle inward", "Land softly on forefoot"],
          },
          {
            description:
              "Stand on one leg, upper body slightly leaning forward. Jump approx. 1m sideways onto the other leg. Land softly on forefoot, maintaining slight hip/knee bend and balance.",
            duration: 30,
            sets: 2,
            focusPoints: ["Knees must NOT buckle inward", "Land softly on forefoot"],
          },
          {
            description:
              "Stand in center of imagined cross on floor. Jump alternately forward, backward, sideways, and diagonally over the cross. Jump quickly and explosively.",
            duration: 30,
            sets: 2,
            focusPoints: ["Knees must NOT buckle inward", "Land softly on forefoot", "Jump quickly and explosively"],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Laufübungen (Running Exercises)",
    description: "High-intensity running drills and injury-preventing change-of-direction mechanics",
    totalDuration: 480, // 8 minutes
    exercises: [
      {
        id: 13,
        germanName: "LAUFEN ÜBER DAS SPIELFELD",
        englishName: "Run Across the Field",
        description: "Run from one side of the field to the other at 75-80% of maximal speed.",
        reps: 2,
        sets: 1,
        focusPoints: ["Target speed: 75-80% of maximal speed", "Maintain good running form"],
      },
      {
        id: 14,
        germanName: "LAUFEN HOCH-WEIT-SPRÜNGE",
        englishName: "Bounding/High-Long Jumps",
        description:
          "Run with high and long jumps (bounding). Bring the swinging knee as high as possible and the opposing arm forward. Land softly on the forefoot. Cross the entire field, jog back to recover.",
        reps: 2,
        sets: 1,
        focusPoints: [
          "Knees must NOT buckle inward",
          "Land softly on forefoot",
          "Bring knee high with opposing arm forward",
        ],
      },
      {
        id: 15,
        germanName: "LAUFEN RICHTUNGSWECHSEL",
        englishName: "Change of Direction Drill",
        description:
          "4-5 steps running, then quick change of direction left (plant & cut) after planting right foot. Accelerate for 5-7 steps (sprint 80-90% max speed), reduce tempo, then change direction right. Cross field, jog back to recover.",
        reps: 2,
        sets: 1,
        focusPoints: ["Knees must NOT buckle inward", "Plant and cut with control", "Sprint at 80-90% max speed"],
      },
    ],
  },
]
