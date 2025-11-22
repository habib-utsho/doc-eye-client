"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { Chip } from "@heroui/chip";

import Container from "@/src/components/ui/Container";
import {
  HeartOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  FireOutlined,
  SmileOutlined,
  RocketOutlined,
  BulbOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { title, subtitle } from "@/src/components/primitives";
import MyMotion from "@/src/components/ui/MyMotion";

const healthQuotes = [
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
  },
  {
    text: "Health is not about the weight you lose, but the life you gain.",
    author: "Dr. Josh Axe",
  },
  {
    text: "The greatest wealth is health.",
    author: "Virgil",
  },
  {
    text: "Your body can stand almost anything. It's your mind you have to convince.",
    author: "Unknown",
  },
  {
    text: "Fitness is not about being better than someone else. It's about being better than you used to be.",
    author: "Khloe Kardashian",
  },
];

const FitHealthyPage = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % healthQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const dailyGoals = [
    {
      label: "Water Intake",
      value: waterIntake,
      max: 8,
      unit: "glasses",
      color: "primary",
    },
    {
      label: "Steps",
      value: steps,
      max: 10000,
      unit: "steps",
      color: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container className="py-12 space-y-12">
        {/* Hero Section */}
        <MyMotion y={30} delay={0.1}>
          <div className="text-center space-y-4">
            <MyMotion scale={1.5} delay={0.3}>
              <Chip
                startContent={<RocketOutlined className="animate-bounce" />}
                variant="flat"
                size="lg"
                className="mb-4 text-primary"
              >
                Coming Soon
              </Chip>
            </MyMotion>
            <h1
              className={`${title({
                size: "lg",
              })} bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent`}
            >
              Fit & Healthy
            </h1>
            <p className={`${subtitle()} max-w-2xl mx-auto`}>
              Your personal wellness companion is on the way! Track your
              fitness, monitor your health, and achieve your wellness goals.
            </p>
          </div>
        </MyMotion>

        {/* Daily Quote Section */}
        <Card className="bg-gradient-to-br from-primary/10 to-success/10 border-none shadow-lg">
          <MyMotion y={20} delay={0.2}>
            <CardBody className="text-center py-8 px-6 space-y-4">
              <BulbOutlined className="text-5xl text-primary mx-auto animate-pulse" />
              <div className="space-y-2">
                <p className="text-xl md:text-2xl font-semibold italic text-gray-800 dark:text-white">
                  &ldquo;{healthQuotes[currentQuote].text}&rdquo;
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  — {healthQuotes[currentQuote].author}
                </p>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {healthQuotes.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentQuote
                        ? "bg-primary w-8"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </CardBody>
          </MyMotion>
        </Card>

        {/* Features Preview Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Daily Goals Tracker */}
          <Card className="shadow hover:shadow-lg transition-shadow">
            <MyMotion y={25} delay={0.15}>
              <CardHeader className="flex gap-3 pb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrophyOutlined className="text-2xl text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Daily Goals</h3>
                  <p className="text-sm text-gray-500">Track your progress</p>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                {dailyGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{goal.label}</span>
                      <span className="text-gray-500">
                        {goal.value}/{goal.max} {goal.unit}
                      </span>
                    </div>
                    <Progress
                      value={(goal.value / goal.max) * 100}
                      color={
                        goal.color as
                          | "primary"
                          | "success"
                          | "warning"
                          | "danger"
                          | "default"
                          | "secondary"
                      }
                      className="max-w-full"
                    />
                  </div>
                ))}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => setWaterIntake(Math.min(waterIntake + 1, 8))}
                    className="text-primary-500"
                  >
                    + Water
                  </Button>
                  <Button
                    size="sm"
                    color="success"
                    variant="flat"
                    onPress={() => setSteps(Math.min(steps + 1000, 10000))}
                  >
                    + Steps
                  </Button>
                </div>
              </CardBody>
            </MyMotion>
          </Card>

          {/* Workout Plans */}
          <Card className="shadow hover:shadow-lg transition-shadow">
            <MyMotion y={25} delay={0.25}>
              <CardHeader className="flex gap-3 pb-3">
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <FireOutlined className="text-2xl text-warning" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Workout Plans</h3>
                  <p className="text-sm text-gray-500">Personalized routines</p>
                </div>
              </CardHeader>
              <CardBody className="space-y-3">
                {[
                  "Cardio Blast",
                  "Strength Training",
                  "Yoga & Flexibility",
                ].map((workout, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <ThunderboltOutlined className="text-warning" />
                      <span className="font-medium">{workout}</span>
                    </div>
                    <Chip size="sm" variant="flat" color="warning">
                      Soon
                    </Chip>
                  </div>
                ))}
              </CardBody>
            </MyMotion>
          </Card>

          {/* Nutrition Guide */}
          <Card className="shadow hover:shadow-lg transition-shadow">
            <MyMotion y={25} delay={0.35}>
              <CardHeader className="flex gap-3 pb-3">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <HeartOutlined className="text-2xl text-success" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Nutrition Guide</h3>
                  <p className="text-sm text-gray-500">Healthy meal plans</p>
                </div>
              </CardHeader>
              <CardBody className="space-y-3">
                {[
                  { label: "Calorie Tracker", icon: "🍎" },
                  { label: "Meal Planner", icon: "🥗" },
                  { label: "Recipe Library", icon: "📖" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <Chip size="sm" variant="flat" color="success">
                      Soon
                    </Chip>
                  </div>
                ))}
              </CardBody>
            </MyMotion>
          </Card>

          {/* Health Metrics */}
          <Card className="shadow hover:shadow-lg transition-shadow">
            <MyMotion y={25} delay={0.45}>
              <CardHeader className="flex gap-3 pb-3">
                <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
                  <HeartOutlined className="text-2xl text-danger animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Health Metrics</h3>
                  <p className="text-sm text-gray-500">Monitor vitals</p>
                </div>
              </CardHeader>
              <CardBody className="space-y-3">
                {[
                  { label: "Heart Rate", value: "72 bpm", color: "danger" },
                  {
                    label: "Blood Pressure",
                    value: "120/80",
                    color: "primary",
                  },
                  {
                    label: "Sleep Quality",
                    value: "7.5 hrs",
                    color: "secondary",
                  },
                ].map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <span className="font-medium">{metric.label}</span>
                    <Chip
                      size="sm"
                      color={
                        metric.color as
                          | "primary"
                          | "success"
                          | "warning"
                          | "danger"
                          | "default"
                          | "secondary"
                      }
                      variant="flat"
                    >
                      {metric.value}
                    </Chip>
                  </div>
                ))}
              </CardBody>
            </MyMotion>
          </Card>

          {/* Mental Wellness */}
          <Card className="shadow hover:shadow-lg transition-shadow">
            <MyMotion y={25} delay={0.55}>
              <CardHeader className="flex gap-3 pb-3">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <SmileOutlined className="text-2xl text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Mental Wellness</h3>
                  <p className="text-sm text-gray-500">Mind & mood</p>
                </div>
              </CardHeader>
              <CardBody className="space-y-3">
                {["Meditation", "Stress Relief", "Mood Tracker"].map(
                  (activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <SmileOutlined className="text-secondary" />
                        <span className="font-medium">{activity}</span>
                      </div>
                      <Chip size="sm" variant="flat" color="secondary">
                        Soon
                      </Chip>
                    </div>
                  )
                )}
              </CardBody>
            </MyMotion>
          </Card>

          {/* Achievements */}
          <Card className="shadow hover:shadow-lg transition-shadow">
            <MyMotion y={25} delay={0.65}>
              <CardHeader className="flex gap-3 pb-3">
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <StarOutlined className="text-2xl text-warning animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Achievements</h3>
                  <p className="text-sm text-gray-500">Earn rewards</p>
                </div>
              </CardHeader>
              <CardBody className="space-y-3">
                {[
                  { badge: "🏆", name: "Week Warrior", desc: "7 days active" },
                  { badge: "💪", name: "Strength Master", desc: "50 workouts" },
                  { badge: "🔥", name: "Streak King", desc: "30 day streak" },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50"
                  >
                    <span className="text-3xl">{achievement.badge}</span>
                    <div>
                      <p className="font-semibold">{achievement.name}</p>
                      <p className="text-xs text-gray-500">
                        {achievement.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </CardBody>
            </MyMotion>
          </Card>
        </div>

        {/* Call to Action */}
        <MyMotion y={30} delay={0.3}>
          <Card className="bg-gradient-to-r from-primary to-success text-white shadow-2xl">
            <CardBody className="text-center py-12 px-6 space-y-6">
              <RocketOutlined className="text-6xl mx-auto animate-bounce" />
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Get Ready for Your Health Journey!
                </h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  We&apos;re building something amazing to help you achieve your
                  fitness goals and live a healthier lifestyle.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button
                  size="lg"
                  className="bg-white text-primary font-semibold"
                  startContent={<HeartOutlined />}
                >
                  Notify Me
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-white text-white font-semibold"
                  startContent={<StarOutlined />}
                >
                  Learn More
                </Button>
              </div>
            </CardBody>
          </Card>
        </MyMotion>
      </Container>
    </div>
  );
};

export default FitHealthyPage;
