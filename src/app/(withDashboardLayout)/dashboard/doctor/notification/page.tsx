"use client";
import MyMotion from "@/src/components/ui/MyMotion";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  MailOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import React from "react";
import { FaHandSparkles } from "react-icons/fa6";
import { toast } from "sonner";

export default function NotificationPage() {
  return (
    <>
      <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <Card className="border-0 shadow bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl">
            <CardHeader className="text-center pb-8 flex flex-col gap-2 items-center justify-center">
              {/* Icon + Badge */}
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

              <h2 className="text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Notifications page
              </h2>

              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                We{"'"}re crafting something amazing for you. Your personalized
                notification experience is under construction.
              </p>
            </CardHeader>

            <CardBody className="space-y-8">
              <Divider className="bg-slate-200 dark:bg-slate-800" />

              {/* Timeline Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <CalendarOutlined className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                    Launching Soon
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Expected in early 2026
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <ClockCircleOutlined className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                    In Development
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Final touches being added
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FaHandSparkles className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                    Exciting Features
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Stats, settings, achievements & more
                  </p>
                </div>
              </div>

              <Divider className="bg-slate-200 dark:bg-slate-800" />

              {/* Call to Action */}
              <div className="text-center space-y-6">
                <p className="text-slate-600 dark:text-slate-400">
                  Want to be the first to know when it{"'"}s ready?
                </p>

                <Button
                  size="lg"
                  className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
                  onPress={() => toast("Notifications coming soon")}
                >
                  <MailOutlined className="w-5 h-5" />
                  Get Notified on Launch
                </Button>

                <p className="text-xs text-slate-500 dark:text-slate-500 pt-4">
                  No spam, just one email when your profile is live
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Footer Credit (optional) */}
          <p className="text-center mt-12 text-sm text-slate-500 dark:text-slate-600">
            © 2025 DocEye. Made with care.
          </p>
        </div>
      </div>
    </>
  );
}
