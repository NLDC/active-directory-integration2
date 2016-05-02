<?php

/**
 * It_Role_ManagerIt
 *
 * @author Christopher Klein <ckl@neos-it.de>
 * @access public
 */
class It_Role_ManagerIT extends It_BasicTest
{
	/* @var Multisite_Configuration_Service | PHPUnit_Framework_MockObject_MockObject */
	private $configuration;

	/* @var Ldap_Connection */
	private $connection;

	/* @var Ldap_ConnectionDetails */
	protected $connectionDetails;

	/* @var Adi_Role_Manager */
	private $sut;

	public function setUp()
	{
		$this->configuration = $this->createMock('Multisite_Configuration_Service');

		$this->connection = new Ldap_Connection($this->configuration);
		$this->connectionDetails = $this->createAdConnectionDetails();
		$this->sut = new Adi_Role_Manager($this->configuration, $this->connection);
		$this->connection->connect($this->connectionDetails);
		$this->prepareActiveDirectory($this->connection->getAdLdap());
	}

	public function tearDown()
	{
		$this->rollbackAdAfterConnectionIt($this->connection->getAdLdap());
		Mockery::close();
	}

	/**
	 * @test
	 */
	public function createRoleMapping_findsTheUsersSecurityGroups()
	{
		$givenGroups = array("Domänen-Admins", "Users", "Systemadmins", "YetAnotherUserGroup", $this->groupName1);

		$roleMapping = $this->sut->createRoleMapping($this->username1);
		$this->assertTrue(sizeof($roleMapping->getSecurityGroups()) > 0);
		$this->assertTrue(in_array($this->groupName1, $roleMapping->getSecurityGroups()));
	}
}
