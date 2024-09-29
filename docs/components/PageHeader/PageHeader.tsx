import { Badge, Container, Group, Text, Title } from "@mantine/core";
import { GithubIcon, NpmIcon } from "@mantinex/dev-icons";
import {
  IconEdit,
  IconLicense,
  IconPackage,
  IconUserCode,
  IconVersions,
} from "@tabler/icons-react";
import pack from "../../../package/package.json";
import type { PackageData } from "../../data";
import classes from "./PageHeader.module.css";
import { PageHeaderLink } from "./PageHeaderLink/PageHeaderLink";

interface PageHeaderProps {
  data: PackageData;
}

export function PageHeader({ data }: PageHeaderProps) {
  return (
    <header className={classes.root}>
      <Container size="lg">
        <Title className={classes.title}>{data.packageName}</Title>
        <Text className={classes.description}>{data.packageDescription}</Text>

        <div className={classes.links}>
          <PageHeaderLink
            label="Version"
            icon={<IconVersions size={18} stroke={1.5} />}
          >
            <Badge>v{pack.version}</Badge>
          </PageHeaderLink>
          <PageHeaderLink
            label="Source"
            icon={<GithubIcon size={16} />}
            link={data.repositoryUrl}
          >
            View source code
          </PageHeaderLink>
          <PageHeaderLink
            label="Package"
            icon={<NpmIcon size={16} />}
            link={`https://npmjs.com/package/${data.packageName}`}
          >
            {data.packageName}
          </PageHeaderLink>
          <PageHeaderLink
            label="See More"
            icon={<IconPackage size={16} />}
            link={`https://mantine-extensions.vercel.app/`}
          >
            Mantine Extensions
          </PageHeaderLink>
          <PageHeaderLink
            label="Docs"
            icon={<IconEdit size={18} stroke={1.5} />}
            link={data.mdxFileUrl}
          >
            Edit this page
          </PageHeaderLink>
          <PageHeaderLink
            label="Built by"
            icon={<IconUserCode size={18} stroke={1.5} />}
            link={`https://github.com/${data.author.githubUsername}`}
          >
            {data.author.name}{" "}
            <Text span c="dimmed" inherit>
              (@{data.author.githubUsername})
            </Text>
          </PageHeaderLink>
          <PageHeaderLink
            label="License"
            icon={<IconLicense size={18} stroke={1.5} />}
            link={data.licenseUrl}
          >
            MIT
          </PageHeaderLink>
          <Group mt={18}>
            <a href="https://www.buymeacoffee.com/johnfazioli">
              <img
                alt="Buy me a coffee"
                height={32}
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=johnfazioli&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
              />
            </a>
          </Group>
        </div>
      </Container>
    </header>
  );
}
